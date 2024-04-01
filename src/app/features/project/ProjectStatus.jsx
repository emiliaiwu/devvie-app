import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext, useRef, createElement, useMemo } from "react";
import { projectStatus } from "../../data/projectData";
import { DropdownArrowIcon } from "../../data/icon";
import { HoverAccentColor } from "../../components";

const ProjectStatus = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		isNewProjectOpen,
		handleModalOpen,
		handleModalClose,
		newProject,
		setNewProject,
		columns,
	} = useContext(ProjectContext);
	const dropdownRef = useRef(null);
	const memoizedShapes = useMemo(() => {
		const shapesArray = projectStatus.map((statusItem) => statusItem.shape);
		return shapesArray;
	}, []);

	const handleClick = (item) => {
		setNewProject((prev) => ({
			...prev,
			status: {
				id: item.id,
				title: item.title,
				color: item.color,
			},
		}));
		handleModalClose()
	};

	return (
		<div className='w-full relative z-[8]'>
			<div className='text-base px-1 mb-3'>Project Status</div>
			<div
				style={{
					backgroundColor: userPreferences.shade.card,
					color: userPreferences.shade.text.secondaryText,
				}}
				className={`${userPreferences.border} flex justify-between px-4 py-3 items-center  `}
			>
				<div className='flex items-center gap-1 px-1'>
					<span
						style={{ color: `${newProject.status?.color}` }}
						className='text-base'
					>
						{newProject.status?.title
							? newProject.status.title
							: "Choose your project status"}
					</span>
				</div>
				<span
					onClick={() => handleModalOpen('status')}
					className='cursor-pointer'
				>
					<HoverAccentColor>
						<DropdownArrowIcon
							className={`${
								isNewProjectOpen.status ? "rotate-180" : ""
							} w-6 h-6 transition-all duration-200 ease`}
						/>
					</HoverAccentColor>
				</span>
			</div>
			{isNewProjectOpen.status && (
				<div
					ref={dropdownRef}
					style={{
						backgroundColor: userPreferences.shade.card,
						color: userPreferences.shade.text.primaryText,
						borderColor: userPreferences.shade.other,
					}}
					className={`${userPreferences.border} top-24 w-[280px] md:w-[300px] absolute border pr-1 pt-4 pb-3`}
				>
					<ul className='overflow-y-scroll scroll h-60'>
						{columns.map((item, index) => (
							<li
								key={item.id}
								onClick={() => handleClick(item)}
								style={{ borderColor: userPreferences.shade.other }}
								
								className={`${
									projectStatus.length - 1 === index
										? "border-none"
										: "border-b"
								} flex items-center gap-2 p-3 pl-7 cursor-pointer`}
							>
								<span style={{ color: `${item.color}` }}>
									{createElement(memoizedShapes[index], {
										className: "sm:w-[13px] sm:h-[13px] h-4 w-4 mr-1",
									})}
								</span>
								<span
									style={{ color: `${item.color}` }}
									className='text-sm sm:text-base capitalize'
								>
									{item.title}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ProjectStatus;
