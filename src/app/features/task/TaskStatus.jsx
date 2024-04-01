import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext, useRef } from "react";
import { DropdownArrowIcon } from "../../data/icon";
import { HoverAccentColor } from "../../components";

const TaskStatus = ({ taskStatus }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		newTask,
		setNewTask,
		isNewTaskChildrenOpen,
		handleCloseTaskChildren,
		handleOpenTaskChildren,
	} = useContext(ProjectContext);

	const dropdownRef = useRef(null);

	const handleClick = (item) => {
		setNewTask((prev) => ({
			...prev,
			status: {
				id: item.id,
				title: item.status,
				color: item.color,
			},
		}));
		handleCloseTaskChildren();
	};



	console.log(newTask);

	return (
		<div className='w-full relative z-10'>
			<div className='text-base px-1 mb-1'>Project Status</div>
			<div
				style={{
					backgroundColor: userPreferences.shade.background,
					color: userPreferences.shade.text.secondaryText,
				}}
				className={`${userPreferences.border} flex justify-between py-2 px-4 items-center  `}
			>
				<div className='flex items-center gap-1 px-1'>
					<span
						style={{ color: `${newTask.status?.color}` }}
						className='text-sm'
					>
						{newTask.status?.title
							? newTask.status.title
							: "choose task status"}
					</span>
				</div>
				<span
					onClick={() =>
						isNewTaskChildrenOpen.status
							? handleCloseTaskChildren()
							: handleOpenTaskChildren("status")
					}
					className='cursor-pointer'
				>
					<HoverAccentColor>
						<DropdownArrowIcon
							className={`${
								isNewTaskChildrenOpen.status ? "rotate-180" : ""
							} w-6 h-6 transition-all duration-200 ease`}
						/>
					</HoverAccentColor>
				</span>
			</div>
			{isNewTaskChildrenOpen.status && (
				<div
					ref={dropdownRef}
					style={{
						backgroundColor: userPreferences.shade.background,
						color: userPreferences.shade.text.primaryText,
						borderColor: userPreferences.shade.other,
					}}
					className={`${userPreferences.border} top-[90px] w-[250px] absolute border`}
				>
					<ul className='py-2'>
						{taskStatus?.map((item, index) => (
							<li
								key={item.status}
								onClick={() => handleClick(item)}
								style={{ borderColor: userPreferences.shade.other }}
								className={`${
									taskStatus.length - 1 === index ? "border-none" : "border-b"
								} flex items-center gap-2 py-2 px-5 cursor-pointer hover:opacity-70`}
							>
								<span
									style={{ color: `${item.color}` }}
									className='text-sm capitalize'
								>
									{item.status}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default TaskStatus;
