import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
	AppContext,
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";
import { usePreventBodyScroll } from "../../../hooks";
import { projectStatus } from "../../data/projectData";
import TaskPageBoard from "./TaskPageBoard";

const TaskPage = () => {
	const { isSidebarOpen } = useContext(AppContext);
	const { userPreferences } = useContext(UserPreferencesContext);
	const { isNewTaskModalOpen } = useContext(TaskContext);
	const { isCreateNewProjectModalOpen, allProjects } =
		useContext(ProjectContext);

	usePreventBodyScroll(isCreateNewProjectModalOpen || isNewTaskModalOpen);

	const renderProjectIcon = (status) => {
		const statusConfig = projectStatus.find((item) => item.status === status);

		if (statusConfig) {
			const IconComponent = statusConfig.shape;
			return (
				<IconComponent
					style={{ color: statusConfig.color }}
					className='w-3 h-3 mr-2'
				/>
			);
		}

		// Return a default icon or handle the case when the status is not found
		return null;
	};

	return (
		<section
			style={{
				backgroundColor: userPreferences.shade.background,
				color: userPreferences.shade.text.primaryText,
				fontFamily: userPreferences.font.fontFamily,
			}}
			className=' lg:pl-20 min-h-screen lg:mt-0 mx-auto relative'
		>
			<div
				style={{ backgroundColor: userPreferences.shade.background }}
				className='flex flex-col lg:flex-row justify-between items-start px-2'
			>
				{/* sidebar links */}
				<div
					style={{ backgroundColor: userPreferences.shade.card }}
					className={`${
						isSidebarOpen ? "lg:w-56 lg:opacity-100" : "lg:w-0 lg:opacity-0"
					} hidden lg:flex flex-col border-opacity-40 pb-5 min-h-screen lg:h-screen lg:fixed lg:left-[80px] lg:right-0 bg-black transition-width duration-500 ease shadow-lg z-10 gap-2`}
				>
					<div className='h-[70px] px-4 flex pt-3'>
						<h1 className='text-2xl tracking-tight flex items-center font-medium '>
							Tasks
						</h1>
					</div>

					{/* list */}
					<div className='flex-1 px-4 scroll lg:overflow-y-scroll pt-5 flex flex-col justify-between'>
						<div className='mb-8'>
							<h2
								style={{
									color: userPreferences.shade.text.primaryText,
									fontFamily: userPreferences.font.fontFamily,
								}}
								className='uppercase text-lg md:text-base font-semibold tracking-wider mb-4'
							>
								My Projects
							</h2>

							<ul
								style={{
									fontFamily: userPreferences.font.fontFamily,
								}}
								className='flex flex-col gap-5'
							>
								{allProjects.map((project, index) => (
									<li
										key={index}
										className={`cursor-pointer flex hover:bg-${userPreferences.color} hover-color`}
									>
										<NavLink
											to={`/user/projects/${project?.slug}`}
											style={{
												fontFamily: userPreferences.font.fontFamily,
												"--hover-color": userPreferences.color,
												color: userPreferences.shade.text.secondaryText,
											}}
											className={`flex items-center text-[13px]`}
										>
											{renderProjectIcon(project?.status.title)}
											<span
												className={`flex hover:text-[--hover-color] items-center gap-4 capitalize whitespace-normal++
												`}
											>
												{project?.title || `project${project?.slug}`}
											</span>
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div
					style={{ backgroundColor: userPreferences.shade.background }}
					className={`${
						isSidebarOpen ? "lg:ml-56 " : "lg:ml-0"
					} flex-1 transition-width duration-500 ease ml-0 pt-24 mx-auto overflow-x-auto lg:pl-8 lg:pr-10 justify-center items-center w-full px-4 `}
				>
					<TaskPageBoard />
				</div>
			</div>
		</section>
	);
};

export default TaskPage;
