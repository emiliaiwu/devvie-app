import React, { useContext } from "react";
import { UserPreferencesContext } from "../../context";
import TaskPageCard from "./TaskPageCard";

const MemoizedColumn = React.memo(
	({ statusName, color, taskColumnId, tasks, projectColumnId, projectId }) => {
		const { userPreferences } = useContext(UserPreferencesContext);

		return (
			<div
				style={{
					color: userPreferences.shade.text.primaryText,
					fontFamily: userPreferences.font.fontFamily,
					backgroundColor: userPreferences.shade.card,
				}}
				className={`${userPreferences.border} w-[280px] xs:w-[320px] pb-5 flex-shrink-0 overflow-hidden`}
			>
				<div className='flex items-center justify-between mb-5  '>
					<div
						style={{ backgroundColor: `${color}` }}
						className='h-[52px] w-full px-4  flex justify-between items-center '
					>
						<h2 className='text-base capitalize'>{statusName}</h2>
						<div
							className='text-[13px] rounded-full flex justify-center items-center w-7 h-7'
							style={{
								color: userPreferences.shade.text.secondaryText,
								backgroundColor: userPreferences.shade.other,
							}}
						>
							<span>{tasks ? tasks.length : "0"}</span>
						</div>
					</div>
				</div>

				<div className='flex justify-center items-center w-full pl-4 pr-[6px] '>
					<div className='flex flex-col gap-4 h-[600px] overflow-y-scroll overflow-x-hidden scroll w-full pr-1 '>
						{tasks?.map((task) => (
							<TaskPageCard
								key={task.id}
								task={task}
								taskColumnId={taskColumnId}
								projectColumnId={projectColumnId}
								projectId={projectId}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
);

MemoizedColumn.displayName = "TaskPageColumn";

export default MemoizedColumn;
