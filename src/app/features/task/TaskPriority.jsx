import { priorityTags } from "../../data/projectData";
import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext } from "react";
import { DropdownArrowIcon } from "../../data/icon";
import { HoverAccentColor, PriorityTag } from "../../components";

const TaskPriority = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		isNewTaskChildrenOpen,
		newTask,
		setNewTask,
		handleCloseTaskChildren,
		handleOpenTaskChildren,
	} = useContext(ProjectContext);
    
    console.log(newTask)

	const handleSelect = (tag) => {
		handleCloseTaskChildren()
		setNewTask((prev) => ({
			...prev,
			priority: tag,
		}));
	};

	return (
		<div className='w-full relative z-[6]'>
			<div className='mb-1 px-1'>
				<h1 className='text-base'>Priority</h1>
			</div>
			<div className='w-full flex gap-5 flex-col'>
				<div
					style={{
						backgroundColor: userPreferences.shade.background,
						color: userPreferences.shade.text.secondaryText,
					}}
					className={`${userPreferences.border} flex justify-between px-4 py-2 items-center `}
				>
					<PriorityTag tag={newTask.priority} />
					<span
						onClick={() =>
							isNewTaskChildrenOpen.priority
								? handleCloseTaskChildren()
								: handleOpenTaskChildren("priority")
						}
						className='cursor-pointer'
					>
						<HoverAccentColor>
							<DropdownArrowIcon
								className={`${
									isNewTaskChildrenOpen.priority ? "rotate-180" : ""
								} w-6 h-6 transition-all duration-200 ease`}
							/>
						</HoverAccentColor>
					</span>
				</div>
				{isNewTaskChildrenOpen.priority && (
					<div
						style={{
							backgroundColor: userPreferences.shade.background,
							borderColor: userPreferences.shade.other,
						}}
						className={`${userPreferences.border} absolute w-full md:w-[250px] top-[90px] p-3 border `}
					>
						<ul
							className={`w-full overflow-y-scroll scroll h-52 flex flex-col gap-4 p-2 `}
						>
							{priorityTags.map((tag, index) => (
								<li
									onClick={() => handleSelect(tag)}
									key={index}
									className='capitalize p- flex items-center cursor-pointer hover:opacity-70'
								>
									<PriorityTag tag={tag} />
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskPriority;
