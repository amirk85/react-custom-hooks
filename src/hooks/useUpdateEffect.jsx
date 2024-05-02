import { useEffect, useRef } from "react";

function useUpdateEffect(callback, deps = []) {
	const isFirstrender = useRef(true);

	useEffect(() => {
		if (!isFirstrender.current) {
			return callback();
		}
		isFirstrender.current = false;
	}, deps);
}

export default useUpdateEffect;
