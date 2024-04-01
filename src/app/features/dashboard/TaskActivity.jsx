import { useContext } from "react";
import { DashboardContext, UserPreferencesContext } from "../../context";
import BarChart from "./BarChart";
import NoDataSmall from "../../components/NoDataSmall";

const TasksActivity = () => {
	
	const { userPreferences } = useContext(UserPreferencesContext);
	const { tasksInColumns } = useContext(DashboardContext);

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
			}}
			className={`${userPreferences.border} w-full lg:w-2/3 h-[360px] flex flex-col justify-center items-center`}
		>
			

			{tasksInColumns.length !== 0 ? (
				<div className='h-[300px] w-full px-3 flex justify-center items-center'>
					<BarChart />
				</div>
			) : (
				<NoDataSmall paragraph={'There are no task activities'} />
			)}
		</div>
	);
};

export default TasksActivity;
