import { useContext } from "react";
import {
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";
import { HoverAccentColor, PriorityTag } from "../../components";
import { DeleteIcon, EditCircleIcon, MoveIcon } from "../../data/icon";
import TaskCardList from "./TaskCardList";

const TaskCard = ({ taskColumnId, task, projectColumnId, projectId }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {  setIsNewTaskModalOpen, setIsUpdating } =
		useContext(ProjectContext);
	const { setIsStatusOpen, deleteTask, editTask } = useContext(TaskContext);


	const handleChangeTaskStatus = (task) => {
		editTask(task);
		setIsStatusOpen(true);
	};

	const handleEditTask = (task) => {
		editTask(task);
		setIsUpdating(true);
		setIsNewTaskModalOpen(true);
	};

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

						<div className='flex items-center gap-3'>
							<span
								onClick={() => handleEditTask(task)}
								className='cursor-pointer'
							>
								<HoverAccentColor>
									<EditCircleIcon className='w-4 h-4' />
								</HoverAccentColor>
							</span>

							<span
								onClick={() => handleChangeTaskStatus(task)}
								className='cursor-pointer'
							>
								<HoverAccentColor>
									<MoveIcon className='w-4 h-4' />
								</HoverAccentColor>
							</span>

							<span
								className='cursor-pointer'
								onClick={() =>
									deleteTask(projectColumnId, projectId, taskColumnId, task.id)
								}
							>
								<HoverAccentColor>
									<DeleteIcon className='w-4 h-4' />
								</HoverAccentColor>
							</span>
						</div>
					</div>

					<div className='px-5 flex flex-col gap-4 w-full'>
						<div>
							{task.title?.length !== 0 && (
								<h1
									className='text-base mb-2 capitalize w-full '
									style={{
										whiteSpace: "normal",
									}}
								>
									{task.title}
								</h1>
							)}

							{task.description?.length !== 0 && (
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
							<TaskCardList list={task.list} task={task} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
