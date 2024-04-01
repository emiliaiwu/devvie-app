import ProjectCard from "./ProjectCard";

const PortFolioProjects = ({ userProfile, userPreferences }) => {
	return (
		<div className="w-full px-5">
			<h1 className='lg:text-3xl text-2xl mb-10 flex flex-row justify-center  items-left mt-20 w-full items-center gap-4 '>
				<span
					style={{ borderColor: userPreferences.shade.other }}
					className='border-b w-full'
				></span>
				The Projects
				<span
					style={{ borderColor: userPreferences.shade.other }}
					className='border-b w-full'
				></span>
			</h1>
			<div className='flex flex-row justify-center flex-wrap lg:gap-10 gap-6 items-center mb-20'>
				{userProfile.projects.map((project, index) => (
					<ProjectCard
						key={project.title + index}
						project={project}
						background={userPreferences.shade.card}
					/>
				))}
			</div>
		</div>
	);
};

export default PortFolioProjects;
