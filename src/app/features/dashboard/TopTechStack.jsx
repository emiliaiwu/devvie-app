import { useContext } from "react";
import { DashboardContext, UserPreferencesContext } from "../../context";
import AreaChart from "./AreaChart";
import { NoDataSmall } from "../../components";

const TopTechStack = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { topStacks } = useContext(DashboardContext);
	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
				borderColor: userPreferences.shade.other,
			}}
			className={`${userPreferences.border} h-[420px] p-8  flex justify-center items-center w-full lg:w-2/3  `}
		>
			<div className='w-full h-[360px] flex justify-center items-center'>
				{topStacks.length === 0 ? <NoDataSmall paragraph={"Add tech stack to projects"} /> : <AreaChart />}
			</div>
		</div>
	);
};

export default TopTechStack;
