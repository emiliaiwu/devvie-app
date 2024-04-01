import { useEffect } from "react";

const useScrollToDropdown = (stateVariable, dropdownRef) => {
	useEffect(() => {
		if (stateVariable && dropdownRef.current) {
			const dropdownElement = dropdownRef.current;
			const dropdownBottomPosition =
				dropdownElement.getBoundingClientRect().bottom;

			const scrollAmount =
				window.scrollY + dropdownBottomPosition - window.innerHeight;
			window.scrollTo({
				top: scrollAmount,
				behavior: "smooth",
			});
		}
	}, [stateVariable, dropdownRef]);
};

export default useScrollToDropdown;
