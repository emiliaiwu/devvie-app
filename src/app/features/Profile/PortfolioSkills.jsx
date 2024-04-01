const PortfolioSkills = ({ userPreferences, userProfile }) => {
	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className={` p-6 xxl:w-1/2 lg:w-2/3`}
		>
			<h1 className='text-2xl lg:text-3xl mb-5 flex flex-row gap-3 items-center'>
				<span style={{ color: userPreferences.color }}>{"//"}</span>Skills
			</h1>
			<p
				style={{
					color: userPreferences.shade.text.primaryText,
				}}
				className='whitespace-normal flex flex-wrap items-center gap-3  w-full'
			>
				{userProfile?.techStack.map((skill) => (
					<span
						key={skill}
						style={{
							borderColor: userPreferences.shade.other,
							color: userPreferences.color,
						}}
						className={`${userPreferences.border} px-5 py-2 text-sm border`}
					>
						{skill}
					</span>
				))}
			</p>
		</div>
	);
};

export default PortfolioSkills;
