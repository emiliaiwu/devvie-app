import {
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";
import { useContext, useEffect } from "react";
import { HoverAccentColor, PriorityTag, Tag } from "../../components";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { AddIcon } from "../../data/icon";
import CreateNewTaskModal from "./CreateNewTaskModal";
import { taskStatus } from "../../data/projectData";
import { usePreventBodyScroll } from "../../../hooks";
import ChangeTaskStatus from "./ChangeTaskStatus";
import NoTask from "./NoTask";

const Task = () => {
	const { userPreferences } = useContext(UserPreferencesContext);

	const { allProjects, isNewTaskModalOpen, setIsNewTaskModalOpen } =
		useContext(ProjectContext);

	const { isStatusOpen, updatedTaskStatus, setUpdatedTaskStatus } =
		useContext(TaskContext);

	const { slug } = useParams();
	const project = allProjects.find((project) => project.slug === slug);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [slug]);

	usePreventBodyScroll(isNewTaskModalOpen);

	// Pass the TaskColumnId to the taskStatus
	useEffect(() => {
		// Iterate through taskStatus and update with corresponding id from TaskColumns
		const updatedStatus = taskStatus.map((statusObj) => {
			const matchingColumn = project?.taskColumns?.find(
				(column) => column.status === statusObj.status
			);
			return { ...statusObj, id: matchingColumn ? matchingColumn.id : null };
		});

		setUpdatedTaskStatus(updatedStatus);
	}, [project?.taskColumns]);

	// Project Error Boundary
	if (!project) {
		return <NoTask />;
	}

	// disable create new task
	const inActiveButton =
		project?.status.title === "backlog" || project?.status.title === "to build";

	return (
		<section
			className={`lg:pl-20 min-h-screen lg:mt-0 mx-auto overflow-x-hidden`}
		>
			<div
				style={{
					color: userPreferences.shade.text.primaryText,
					fontFamily: userPreferences.font.fontFamily,
					backgroundColor: userPreferences.shade.background,
				}}
				className='flex flex-col relative overflow-x-hidden gap-8 lg:pl-8 lg:mt-0 mx-auto py-24 lg:pr-10 px-6 '
			>
				{isNewTaskModalOpen && (
					<div
						className={`z-[1000] fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center pt-40 overflow-y-auto`}
					>
						<CreateNewTaskModal
							columnId={project?.columnId}
							projectId={project?.id}
							updatedTaskStatus={updatedTaskStatus}
							slug={project.slug}
						/>
					</div>
				)}

				{isStatusOpen && (
					<div
						className={`z-[1000] fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center overflow-y-auto`}
					>
						<ChangeTaskStatus taskStatus={updatedTaskStatus} />
					</div>
				)}

				{/* details */}
				<div className='mb-6'>
					{/* breadcrumbs */}
					<div
						style={{ color: userPreferences.shade.text.primaryText }}
						className='text-[13px] mb-3 flex items-center'
					>
						<Link to={"/user/projects"} className='mr-1'>
							<HoverAccentColor>projects </HoverAccentColor>
						</Link>
						<span>/</span>
						<Link
							to={`/user/projects/${project?.slug}`}
							className='lowercase ml-1'
						>
							<HoverAccentColor>
								{project.title || `project${project.slug}`}
							</HoverAccentColor>
						</Link>
					</div>

					{/* project title and add task button*/}
					<div className='flex justify-between items-center mb-6 gap-2'>
						<h1 className='text-2xl sm:text-3xl md:text-4xl capitalize whitespace-normal'>
							{project.title || `project${project.slug}`}
						</h1>

						{/* add task button */}
						{/* add a toast saying move project to in developement */}
						<button
							onClick={() =>
								inActiveButton
									? setIsNewTaskModalOpen(false)
									: setIsNewTaskModalOpen(true)
							}
							style={{
								backgroundColor: userPreferences.color,
								color: `${userPreferences.isLightMode ? "white" : "black"}`,
								opacity: `${inActiveButton ? "50%" : "100%"}`,
							}}
							className={`ss:${userPreferences.border} rounded-full flex items-center gap-2 py-2 px-2 ss:px-4 cursor-pointer hover:opacity-60 outline-none`}
						>
							<AddIcon className='w-5 h-5' />
							<span className='text-sm hidden ss:block'>New task</span>
						</button>
					</div>

					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='flex flex-col gap-5'
					>
						<div className='flex items-center gap-10'>
							<div className='text-sm'>Status:</div>{" "}
							<div
								style={{
									backgroundColor: project.status.color,
									color: "white",
								}}
								className='capitalize px-3 py-[3px] text-sm rounded-sm'
							>
								{project.status.title}
							</div>
						</div>
						<div className='flex items-center gap-9'>
							<div className='text-sm'>Priority:</div>{" "}
							<PriorityTag tag={project.priority} />
						</div>
						<div className='flex items-center gap-7'>
							<div className='text-sm'>Deadline:</div>{" "}
							<div
								style={{ color: userPreferences.shade.text.primaryText }}
								className='text-sm'
							>
								{project.dueDate ? project.dueDate : "No date yet"}
							</div>
						</div>
						<div className='flex gap-14'>
							<div className='text-sm'>Tags:</div>
							<div
								style={{ color: userPreferences.shade.text.primaryText }}
								className='flex gap-3 flex-wrap text-sm'
							>
								{project.tag.length !== 0
									? project.tag.map((tag) => (
											<Tag key={tag.id} color={tag.color}>
												{tag.tag}
											</Tag>
									  ))
									: "Add project tags"}
							</div>
						</div>
					</div>
				</div>

				<div>
					{/* links */}
					<div
						style={{ borderColor: userPreferences.shade.other }}
						className='flex flex-col ss:flex-row justify-between items-center border-b mb-10'
					>
						<div
							style={{ borderColor: userPreferences.color }}
							className='flex flex-col justify-center items-center ss:flex-row gap-10 text-base'
						>
							<NavLink
								style={({ isActive }) => ({
									borderBottom: `1px solid ${
										isActive &&
										window.location.pathname ===
											`/user/projects/${project.slug}`
											? userPreferences.color
											: "transparent"
									}`,
								})}
								to={`/user/projects/${project.slug}`}
								className='pb-4 px-8'
								exact // Ensure exact match
							>
								Board
							</NavLink>{" "}
							<NavLink
								style={({ isActive }) => ({
									borderBottom: `1px solid ${
										isActive ? userPreferences.color : "transparent"
									}`,
								})}
								to={`/user/projects/${project.slug}/details`}
								className='pb-4 px-8'
							>
								Details
							</NavLink>
							<NavLink
								style={({ isActive }) => ({
									borderBottom: `1px solid ${
										isActive ? userPreferences.color : "transparent"
									}`,
								})}
								to={`/user/projects/${project.slug}/commits`}
								className='pb-4 px-8'
							>
								Commits
							</NavLink>
						</div>
					</div>
					<section className='h-full'>
						<Outlet context={{ project }} />
					</section>
				</div>
			</div>
		</section>
	);
};

export default Task;
