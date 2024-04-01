import { useContext } from "react";
import { AppContext, ProjectContext, TaskContext, UserPreferencesContext } from "../../context";
import { usePreventBodyScroll } from "../../../hooks";
import { projectStatus } from "../../data/projectData";
import ProjectBoard from "./Project";
import { NavLink } from "react-router-dom";
import { AddProjectIcon } from "../../data/icon";
import CreateNewProjectModal from './CreateNewProjectModal'

const ProjectPage = () => {
	const { isSidebarOpen } = useContext(AppContext);
	const { userPreferences } = useContext(UserPreferencesContext);
	const { isNewTaskModalOpen } = useContext(TaskContext);
	const {
		isCreateNewProjectModalOpen,
		setIsCreateNewProjectModalOpen,
		allProjects,
	} = useContext(ProjectContext);

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
			style={{ backgroundColor: userPreferences.shade.background }}
			className='lg:pl-20 min-h-screen lg:mt-0 mx-auto relative max-w-[100vw] overflow-hidden'
		>
			{/* CREATE NEW PROJECT PAGE */}
			<div
				className={`${
					isCreateNewProjectModalOpen ? "right-0" : "-right-[200%]"
				} absolute transition-width duration-3333333300 ease z-[1000] h-screen overflow-hidden w-full`}
			>
				<div className='z-[1000] w-full'>
					<CreateNewProjectModal />
				</div>
				{isCreateNewProjectModalOpen && (
					<div className='fixed z-[-1] bg-black bg-opacity-90 inset-0'></div>
				)}
			</div>

			<div
				style={{ backgroundColor: userPreferences.shade.background }}
				className='flex flex-col lg:flex-row justify-between items-start px-4 lg:px-2'
			>
				{/* sidebar links */}
				<div
					style={{ backgroundColor: userPreferences.shade.card }}
					className={`${
						isSidebarOpen ? "lg:w-56 lg:opacity-100" : "lg:w-0 md:opacity-0"
					} lg:flex flex-col border-opacity-40 pb-5 min-h-screen md:h-screen md:fixed md:left-[80px] md:right-0 bg-black transition-width duration-500 ease shadow-md z-10 gap-2 hidden`}
				>
					<div className='h-[70px] px-4 flex pt-3'>
						<h1
							style={{
								color: userPreferences.shade.text.primaryText,
								fontFamily: userPreferences.font.fontFamily,
							}}
							className='text-2xl tracking-tight flex items-center font-medium '
						>
							Projects
						</h1>
					</div>

					{/* add new project */}
					<div className='flex items-start px-4'>
						<div
							style={{
								borderColor: ` ${userPreferences.color}`,
								color: userPreferences.color,
							}}
							className={`${userPreferences.border} border hover:border-dashed w-40 px-4 h-9 cursor-pointer whitespace-nowrap`}
						>
							<button
								onClick={() => setIsCreateNewProjectModalOpen(true)}
								className='flex items-center h-full w-full gap-2'
							>
								<AddProjectIcon />
								<span className='capitalize text-sm'>new project</span>
							</button>
						</div>
					</div>

					{/* list */}
					<div className='flex-1 px-4 scroll md:overflow-y-scroll pt-5 flex flex-col justify-between'>
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
					} lg:flex-1 transition-all w-full duration-500 ease ml-0 lg:pt-24 pt-20 mx-auto overflow-x-auto lg:pl-8 lg:pr-3 `}
				>
					<ProjectBoard />
				</div>
			</div>
		</section>
	);
};

export default ProjectPage;
