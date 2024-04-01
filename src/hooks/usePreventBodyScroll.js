import { useEffect } from "react";

function usePreventBodyScroll(isOpen) {
	useEffect(() => {
		 if (isOpen) {
				document.documentElement.classList.add("no-scroll");
				document.body.classList.add("no-scroll");
			} else {
				document.documentElement.classList.remove("no-scroll");
				document.body.classList.remove("no-scroll");
			}

			return () => {
				document.documentElement.classList.remove("no-scroll");
				document.body.classList.remove("no-scroll");
			};
	}, [isOpen]);
}

export default usePreventBodyScroll;
