import {
	DashboardContext,
	ProjectContext,
	UserPreferencesContext,
	UserProfileContext,
} from "../../context";
import { useContext, useState } from "react";
import { Board, Filter } from "../../components";
import ProjectFilter from "./ProjectFilter";
import { AddProjectIcon } from "../../data/icon";
import { useScrollToTop } from "../../../hooks";
import { dashboardImg } from "../../../assets";

const ProjectBoard = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const { firstName } = useContext(DashboardContext);
	const { userProfile } = useContext(UserProfileContext);
	const {
		handleClearFilters,
		setIsCreateNewProjectModalOpen,
		allProjects,
		greeting,
	} = useContext(ProjectContext);

	useScrollToTop();

	const handleFilter = () => {
		handleClearFilters();
		setIsFilterOpen(!isFilterOpen);
	};

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
				color: userPreferences.shade.text.primaryText,
				fontFamily: userPreferences.font.fontFamily,
			}}
			className='flex flex-col relative overflow-x-hidden gap-8 py-4 w-full'
		>
			<div className='mb-4 z-[40] w-full md:pr-8'>
				<div
					style={{ backgroundColor: userPreferences.color }}
					className={`${userPreferences.border} h-[190px] mt-12 flex justify-between items-center px-6 lg:px-20 relative mb-10`}
				>
					<div
						style={{ color: userPreferences.isLightMode ? "white" : "black" }}
						className='flex flex-col justify-center items-start'
					>
						<h1 className='lg:text-5xl mb-2 font-semibold text-2xl whitespace-normal'>
							Hello,{" "}
							<span className='capitalize'>
								{userProfile.firstName || firstName}
							</span>
						</h1>
						<p className='text-lg lg:text-xl max-w-[250px]  lg:max-w-full whitespace-normal font-semibold mt-1 tracking-tight'>
							This is your project board
						</p>
						<p className='text-sm max-w-[250px]  lg:max-w-full whitespace-normal mt-2'>
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

				<div className='flex flex-row justify-between items-center gap-4'>
					<div
						onClick={() => setIsCreateNewProjectModalOpen(true)}
						style={{
							backgroundColor: userPreferences.color,
							color: `${userPreferences.isLightMode ? "white" : "black"}`,
						}}
						className={`${userPreferences.border} text-sm lg:text-base flex items-center gap-2 py-2 px-4 cursor-pointer`}
					>
						<AddProjectIcon className='w-4 h-4' />
						<span className='text-sm'>New project</span>
					</div>
					<Filter isFilterOpen={isFilterOpen} handleFilter={handleFilter} />
				</div>

				{isFilterOpen && (
					<div className='min-h-[60px] mt-6'>
						<ProjectFilter />
					</div>
				)}
			</div>

			<Board />
		</div>
	);
};

export default ProjectBoard;
