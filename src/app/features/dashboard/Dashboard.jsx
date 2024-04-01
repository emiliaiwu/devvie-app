import { useContext } from "react";
import {
	DashboardContext,
	ProjectContext,
	UserPreferencesContext,
	UserProfileContext,
} from "../../context";
import { dashboardImg } from "../../../assets";
import ProjectOverview from "./ProjectOverview";
import OverallProjects from "./OverallProjects";
import TopTechStack from "./TopTechStack";
import ActiveTasks from "./ActiveTasks";
import TasksActivity from "./TaskActivity";
import { useScrollToTop } from "../../../hooks";

const Dashboard = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { firstName } = useContext(DashboardContext);
	const { greeting } = useContext(ProjectContext);
	const { userProfile } = useContext(UserProfileContext);
	useScrollToTop();

	return (
		<section
			style={{
				backgroundColor: userPreferences.shade.card,
				fontFamily: userPreferences.font.fontFamily,
				color: userPreferences.shade.text.primaryText,
			}}
			className=' lg:pl-20 min-h-screen md:mt-0 mx-auto '
		>
			<div className='md:py-24 md:pl-8 md:pr-10  px-4 sm:px-6 flex flex-col gap-10 min-h-screen py-20'>
				<div className=' h-full relative'>
					<div
						style={{ backgroundColor: userPreferences.color }}
						className={`${userPreferences.border} h-[190px] mt-12 flex justify-between items-center px-6 lg:px-20 relative `}
					>
						<div
							style={{ color: userPreferences.isLightMode ? "white" : "black" }}
							className='flex flex-col justify-center items-start'
						>
							<h1 className='lg:text-5xl mb-2 font-semibold text-2xl whitespace-normal'>
								{greeting},{" "}
								<span className='capitalize'>
									{userProfile.firstName || firstName}
								</span>
							</h1>
							<p className='text-base lg:text-lg max-w-[250px]  lg:max-w-full whitespace-normal'>
								Ready to build, manage and track your projects?
							</p>
						</div>

						<div className='overflow-hidden hidden sm:flex'>
							<img
								src={dashboardImg}
								className='h-[250px] w-auto absolute right-16 bottom-0'
							/>
						</div>
					</div>
				</div>

				<ProjectOverview />
				<div className='flex flex-col lg:flex-row justify-between items-center gap-6'>
					<TasksActivity /> <ActiveTasks />
				</div>

				<div className=' flex gap-6 flex-col lg:flex-row'>
					<OverallProjects />
					<TopTechStack />
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
