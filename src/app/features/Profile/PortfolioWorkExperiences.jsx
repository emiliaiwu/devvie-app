import WorkExperience from "./WorkExperience";


const PortfolioWorkExperiences = ({ userPreferences, userProfile }) => {
	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className={`p-6 w-full xxl:w-1/2 lg:w-2/3`}
		>
			<h1 className='text-2xl lg:text-3xl flex flex-row gap-3 items-center mb-2'>
				<span style={{ color: userPreferences.color }}>{"//"}</span>Work
				Experiences
			</h1>
			<WorkExperience userProfile={userProfile} />
		</div>
	);
};

export default PortfolioWorkExperiences