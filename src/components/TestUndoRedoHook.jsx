import React, { useState } from "react";
import useUndoRedo from "../hooks/useUndoRedo";

function TestUndoRedoHook() {
	const { state, setState, undo, redo, isEmpty, isFull } = useUndoRedo([]);
	const [userInput, setUserInput] = useState();

	function handleSubmit(e) {
		e.preventDefault();

		const newTask = {
			title: userInput,
			id: state?.length + 1,
		};

		setUserInput("");
		setState([...state, newTask]);
	}

	function handleDelete(id) {
		const updatedTasks = state?.filter((task) => task?.id !== id);
		setState(updatedTasks);
	}

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="add a task"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
					/>
					<button type="submit">submit</button>
				</form>
			</div>
			<ul>
				{state?.map((task) => (
					<li key={task.id}>
						<span>{task?.title}</span>
						<button onClick={() => handleDelete(task?.id)}>delete</button>
					</li>
				))}
			</ul>
			<div>
				<button disabled={isEmpty} onClick={undo}>
					Undo
				</button>
				<button disabled={isFull} onClick={redo}>
					Redo
				</button>
			</div>
		</div>
	);
}

export default TestUndoRedoHook;
