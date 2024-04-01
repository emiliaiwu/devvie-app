import { useContext } from "react";
import { UserPreferencesContext } from "../../context";
import { HoverAccentColor, PriorityTag } from "../../components";
import TaskPageCardList from "./TaskPageCardList";
import { Link } from "react-router-dom";

const TaskPageCard = ({ taskColumnId, task, projectColumnId, projectId }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div className='mx-auto w-full'>
			<div
				style={{ backgroundColor: userPreferences.shade.background }}
				className={`${userPreferences.border} w-full relative py-5 `}
			>
				<div className='flex flex-col gap-3'>
					<div className='flex items-center justify-between px-5'>
						<div className='w-full inline-flex'>
							<PriorityTag tag={task.priority} />
						</div>
					</div>

					<div className='px-5 flex flex-col gap-4 w-full'>
						<div>
							<HoverAccentColor>
								<Link to={`/user/projects/${task.projectSlug}`}>
									<h1
										className='text-base mb-2 capitalize w-full '
										style={{
											whiteSpace: "normal",
										}}
									>
										{task.title}
									</h1>
								</Link>
							</HoverAccentColor>

							{task.description && (
								<p
									style={{
										color: userPreferences.shade.text.secondaryText,
									}}
									className={` whitespace-normal text-sm leading-5`}
								>
									{task.description}
								</p>
							)}
						</div>
					</div>

					{task.list?.length !== 0 && (
						<div className='px-5'>
							<TaskPageCardList list={task.list} task={task} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskPageCard;
