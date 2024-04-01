const PortfolioAboutMe = ({ userPreferences, userProfile }) => {
	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className={` p-6 w-full xxl:w-1/2 lg:w-2/3`}
		>
			<h1 className='text-2xl lg:text-3xl mb-5 flex flex-row gap-3 items-center'>
				<span style={{ color: userPreferences.color }}>{"//"}</span>About Me
			</h1>
			<p
				style={{ color: userPreferences.shade.text.secondaryText }}
				className='whitespace-normal lg:text-base text-sm h-full leading-7 lg:leading-8'
			>
				{userProfile?.aboutYou}
			</p>
		</div>
	);
};

export default PortfolioAboutMe;
