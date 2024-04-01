import React, { useContext, useEffect, useRef } from "react";
import { TaskContext, UserPreferencesContext } from "../../context";

function NewTask({ children, taskStatus }) {
	const contentRef = useRef(null);
	const { userPreferences } = useContext(UserPreferencesContext);
	const { isNewTaskModalOpen } = useContext(TaskContext);

	// reset scroll to top when modal opens
	useEffect(() => {
		if (isNewTaskModalOpen) {
			contentRef.current.scrollTop = 0;
		}
	}, [isNewTaskModalOpen]);

	return (
		<div
			style={{ color: userPreferences.shade.text.primaryText }}
			ref={contentRef}
			className='flex flex-col gap-5 overflow-y-scroll scroll px-2 h-[560px] mb-3 '
		>
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, { taskStatus });
			})}
		</div>
	);
}

export default NewTask;
