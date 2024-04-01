import { useContext } from "react";
import {
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";
import { ClipLoader } from "react-spinners";
import TaskPriority from "./TaskPriority";
import TaskStatus from "./TaskStatus";
import TaskList from "./TaskList";
import { TaskForm } from "./TaskForm";
import NewTask from "./NewTask";

const CreateNewTaskModal = ({ columnId, projectId, updatedTaskStatus, slug }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { isSubmitting, isUpdating, setIsNewTaskModalOpen } =
		useContext(ProjectContext);

	const { handleUpdateTask, createNewTask, cancelTask } =
		useContext(TaskContext);

	const handleCancel = () => {
		setIsNewTaskModalOpen(false);
		cancelTask();
	};

	return (
		<section
			style={{
				backgroundColor: userPreferences.shade.card,
			}}
			className={`flex justify-center items-center w-full lg:w-[550px] lg:px-3 mt-28 `}
		>
			<div
				style={{ fontFamily: userPreferences.font.fontFamily }}
				className='flex flex-col py-5 px-4 w-full'
			>
				<h1
					style={{ color: userPreferences.shade.text.primaryText }}
					className='text-2xl sm:text-3xl lg:text-4xl pt-3 mb-4'
				>
					Create New Task
				</h1>

				<NewTask taskStatus={updatedTaskStatus}>
					<TaskForm />
					<TaskStatus />
					<TaskPriority />
					<TaskList />
				</NewTask>

				<div className='flex justify-between items-center mb-2'>
					<button
						onClick={handleCancel}
						style={{ backgroundColor: userPreferences.color }}
						className={`${userPreferences.border} h-10 px-7 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease`}
					>
						Cancel
					</button>
					<button
						onClick={() =>
							isUpdating
								? handleUpdateTask()
								: createNewTask(columnId, projectId, slug)
						}
						style={{ backgroundColor: userPreferences.color }}
						className={`${userPreferences.border} h-10 w-36 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease flex justify-center items-center`}
					>
						{isSubmitting ? (
							<ClipLoader loading={true} color={"#FFFFFF"} size={28} />
						) : isUpdating ? (
							"Update task"
						) : (
							"Create task"
						)}
					</button>
				</div>
			</div>
		</section>
	);
};

export default CreateNewTaskModal;
