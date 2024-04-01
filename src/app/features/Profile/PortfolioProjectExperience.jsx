


const PortfolioProjectExperience = ({ userPreferences, userProfile }) => {
	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className={` p-6 w-full xxl:w-1/2 lg:w-2/3`}
		>
			<h1 className='text-2xl lg:text-3xl flex flex-row gap-3 items-center mb-2'>
				<span style={{ color: userPreferences.color }}>{"//"}</span>Project
				Experiences
			</h1>
			<div className='flex flex-col'>
				{userProfile.projectExperience.map((project, index) => (
					<div
						key={project.title}
						style={{ borderColor: userPreferences.shade.other }}
						className={`flex flex-col ${
							index === userProfile.projectExperience.length - 1
								? ""
								: "border-b"
						} py-6 `}
					>
						<h1 className='text-xl lg:text-2xl font-semibold'>{project.title}</h1>
						<div className='flex flex-row gap-2 my-2 whitespace-normal flex-wrap'>
							{project.techStack?.map((tech) => (
								<div
									style={{ color: userPreferences.color }}
									key={tech}
									className='text-xs italic'
								>
									{tech}
								</div>
							))}
						</div>
						<ul className='list-disc pl-4 max-w-[600px]'>
							{project.responsibilities.map((task, index) => (
								<li
									style={{ color: userPreferences.shade.text.secondaryText }}
									key={index}
									className='whitespace-normal text-sm lg:text-base py-1'
								>
									{task}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default PortfolioProjectExperience;
