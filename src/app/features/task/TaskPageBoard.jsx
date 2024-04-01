import { useContext } from "react";
import TaskPageColumn from "./TaskPageColumn";
import DashboardContext from "../dashboard/DashboardContext";
import { UserPreferencesContext } from "../../context";
import { Link } from "react-router-dom";
import { HoverAccentColor, NoData } from "../../components";

const TaskPageBoard = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { taskGroup } = useContext(DashboardContext);
	const totalTasks = taskGroup.reduce((total, task) => {
		const count = total + task.tasks.length;
		return count;
	}, 0);

	return (
		<div className='flex flex-col gap-8'>
			<div className=''>
				<Link
					style={{ color: userPreferences.shade.text.secondaryText }}
					to='/user/projects'
					className='text-[13px] mb-6 font-semibold'
				>
					<HoverAccentColor>/ projects</HoverAccentColor>
				</Link>
				<div className='flex items-end gap-2 mb-1 mt-2'>
					<h1 className='text-2xl sm:text-3xl lg;text-4xl capitalize'>
						All tasks
					</h1>
					<span
						style={{ color: userPreferences.color }}
						className='text-base mb-1'
					>
						({totalTasks})
					</span>
				</div>
				<p
					style={{ color: userPreferences.shade.text.secondaryText }}
					className='text-base'
				>
					{taskGroup.length !== 0 && "Click title to view task"}
				</p>
			</div>

			<div className='ss:overflow-x-scroll scroll-x ss:flex ss:items-start gap-6 max-w-full pb-6 grid justify-center items-center ss:justify-normal'>
				{taskGroup.length === 0 || taskGroup === "undefined" ? (
					<NoData
						title={"No Tasks Found!"}
						paragraph={"Go to the task board to create new task"}
					/>
				) : (
					taskGroup?.map((col, index) => (
						<TaskPageColumn
							key={index}
							color={col.color}
							statusName={col.status}
							tasks={col.tasks}
							column={col}
							// projectName={columnId}
							// projectId={projectId}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default TaskPageBoard;
