import { useState, useRef } from "react";
import PropTypes from "prop-types";

function useUndoRedo(initialState, limit = 10) {
	const [currentState, setCurrentState] = useState(initialState);

	const history = useRef([initialState]);
	const historyPointer = useRef(0);

	const undo = () => {
		if (historyPointer.current > 0) {
			historyPointer.current -= 1;
			setCurrentState(history.current[historyPointer.current]);
		}
	};

	const redo = () => {
		if (historyPointer.current < history.current.length - 1) {
			historyPointer.current += 1;
			setCurrentState(history.current[historyPointer.current]);
		}
	};

	const setState = (newState) => {
		const newHistory = history.current.slice(0, historyPointer.current + 1);
		newHistory.push(newState);

		if (newHistory.length > limit) {
			newHistory.shift();
			historyPointer.current -= 1;
		}

		history.current = newHistory;
		historyPointer.current += 1;
		setCurrentState(newState);
	};

	return {
		state: currentState,
		setState,
		undo,
		redo,
		isEmpty: historyPointer.current === 0,
		isFull: historyPointer.current === history.current.length - 1,
	};
}

useUndoRedo.propTypes = {
	initialState: PropTypes.any.isRequired,
	limit: PropTypes.number,
};

useUndoRedo.defaultProps = {
	limit: 10,
};

export default useUndoRedo;
