import { useContext } from "react";
import DoughnutChart from "./DoughnutChart";
import { DashboardContext, UserPreferencesContext } from "../../context";
import { GoToLinkIcon } from "../../data/icon";
import { Link } from "react-router-dom";
import { HoverAccentColor, NoDataSmall } from "../../components";

const OverallProjects = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { hasProjects } = useContext(DashboardContext);

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
				borderColor: userPreferences.shade.other,
			}}
			className={`${userPreferences.border}  bg-white flex flex-col justify-center items-center h-[420px] gap-2 lg:w-1/3`}
		>
			<div
				style={{
					borderColor: userPreferences.shade.other,
				}}
				className='pb-3 flex justify-between items-center border-b px-6 w-full'
			>
				<h1 className='text-xl'>Overall Projects</h1>
				<Link to='/user/projects'>
					<HoverAccentColor>
						<GoToLinkIcon className='w-5 h-5' />
					</HoverAccentColor>
				</Link>
			</div>

			{hasProjects ? (
				<div className='lg:w-[320px] w-full h-[320px] flex justify-center items-center px-5'>
					<DoughnutChart />
				</div>
			) : (
				<div className=' h-[320px]'>
					<NoDataSmall paragraph={"There are no projects"} />
				</div>
			)}
		</div>
	);
};

export default OverallProjects;
