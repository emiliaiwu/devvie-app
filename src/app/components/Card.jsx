import { useContext, useState } from "react";
import { UserPreferencesContext } from "../context";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { DueDateIcon, StartDateIcon, TechStackIcon } from "../data/icon";
import Tag from "./Tag";
import PriorityTag from "./PriorityTag";
import HoverAccentColor from "./HoverAccentColor";
import ProjectCardModal from "../features/project/ProjectCardModal";
import { Link } from "react-router-dom";

const Card = ({ project }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const [isProjectCardModalOpen, setIsProjectCardModalOpen] = useState(false);
	const stack = project.stack;

	return (
		<div className='mx-auto w-full'>
			<div
				style={{ backgroundColor: userPreferences.shade.background }}
				className={`${userPreferences.border} w-full relative py-5 `}
			>
				{isProjectCardModalOpen && (
					<div className='absolute right-5 top-12'>
						<ProjectCardModal
							project={project}
							setIsOpen={setIsProjectCardModalOpen}
						/>
					</div>
				)}

				<div className='flex flex-col gap-4'>
					<div className='flex items-center justify-between px-5'>
						<div className='w-full inline-flex'>
							<PriorityTag tag={project.priority} />
						</div>
						<div
							onClick={() => setIsProjectCardModalOpen((pre) => !pre)}
							className='flex items-center gap-2 cursor-pointer'
						>
							<HoverAccentColor>
								<BiDotsVerticalRounded className='w-5 h-5' />
							</HoverAccentColor>
						</div>
					</div>

					<div className='flex flex-col gap-5'>
						<div className='px-5'>
							<div
								style={{ color: userPreferences.shade.text.secondaryText }}
								className='flex gap-2 items-center flex-wrap'
							>
								{project.tag.length !== 0
									? project.tag.map((tag) => (
											<Tag key={tag.id} color={tag.color}>
												{tag.tag}
											</Tag>
									  ))
									: "No project tags"}
							</div>
						</div>

						<div className='px-5 flex flex-col gap-4 w-full'>
							<div className='flex flex-col items-start'>
								<HoverAccentColor>
									<Link to={`/user/projects/${project.slug}`}>
										<h1
											className='text-lg mb-2 capitalize '
											style={{
												whiteSpace: "normal",
											}}
										>
											{project.title || `project${project.slug}`}
										</h1>
									</Link>
								</HoverAccentColor>

								<p
									style={{ color: userPreferences.shade.text.secondaryText }}
									className={`overflow-ellipsis whitespace-normal text-sm leading-5 line-clamp-3`}
								>
									{project.description || 'No description yet'}
								</p>
							</div>

							<div className='flex justify-between items-center w-full'>
								<div
									style={{
										color: userPreferences.shade.text.primaryText,
										backgroundColor: userPreferences.shade.card,
									}}
									className='flex items-center gap-1 p-2 rounded-md'
								>
									<StartDateIcon className='w-4 h-4 text-blue-600' />
									<span className=' text-xs'>
										{project.startDate || "No Date"}{" "}
									</span>
								</div>
								<div
									style={{
										color: userPreferences.shade.text.primaryText,
										backgroundColor: userPreferences.shade.card,
									}}
									className='flex items-center gap-1 p-2 rounded-md'
								>
									<DueDateIcon className='w-4 h-4 text-red-600' />
									<span className=' text-xs'>
										{project.dueDate || "No Date"}
									</span>
								</div>
							</div>
						</div>

						{/* FOOTER */}
						<div
							style={{
								borderTop: `1px solid ${userPreferences.shade.other}`,
							}}
							className='pt-4 px-5 flex justify-between items-center w-full'
						>
							<div
								style={{ color: userPreferences.shade.text.primaryText }}
								className='flex items-center gap-2 text-sm w-full'
							>
								<TechStackIcon className='w-5 h-5' />
								<div
									style={{
										color: userPreferences.shade.text.secondaryText,
										borderColor: userPreferences.shade.text.secondaryText,
									}}
									className='flex items-center gap-3 justify-between w-full border-l pl-2'
								>
									{stack.length === 0 && 'No project stack'}
									<div className='xs:flex items-center gap-3 hidden'>
										{stack.slice(0, 3).map((tech, index) => (
											<div
												style={{
													borderColor: userPreferences.shade.text.secondaryText,
												}}
												key={index}
												className={`text-[13px] justify-end`}
											>
												{tech}
											</div>
										))}
									</div>

									{stack.length > 3 && (
										<div
											style={{
												color: userPreferences.shade.text.primaryText,
												backgroundColor: userPreferences.shade.card,
											}}
											className=' text-xs hidden xs:flex items-center rounded-full w-6 h-6 justify-center'
										>
											+{stack.length - 3}
										</div>
									)}
									<div className='xs:hidden flex items-center gap-3'>
										{stack.slice(0, 2).map((tech, index) => (
											<div
												style={{
													borderColor: userPreferences.shade.text.secondaryText,
												}}
												key={index}
												className={`text-[13px] justify-end`}
											>
												{tech}
											</div>
										))}
									</div>

									{stack.length > 2 && (
										<div
											style={{
												color: userPreferences.shade.text.primaryText,
												backgroundColor: userPreferences.shade.card,
											}}
											className=' text-xs xs:hidden flex items-center rounded-full w-6 h-6 justify-center'
										>
											+{stack.length - 2}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
