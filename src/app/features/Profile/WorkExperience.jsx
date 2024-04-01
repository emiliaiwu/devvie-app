import { useContext } from "react";
import { UserPreferencesContext } from "../../context";

const WorkExperience = ({ userProfile }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	return (
		<div className=''>
			{userProfile.workExperience.map((work, index) => (
				<div
					key={work.id}
					style={{ borderColor: userPreferences.shade.other }}
					className={`flex flex-col gap-3 ${
						index === userProfile.workExperience.length - 1 ? "" : "border-b"
					} py-6`}
				>
					<div className='flex flex-col gap-2'>
						<h1 className='text-xl lg:text-2xl font-semibold'>{work.jobTitle}</h1>

						<p
							style={{
								color: userPreferences.shade.text.secondaryText,
							}}
							className='text-xs flex flex-row gap-2 italic'
						>
							<span>{work.startDate}</span> {"-"}
							<span>{work.isPresent ? "Present" : work.endDate}</span>
						</p>
						<p className='text-sm lg:text-base flex flex-row gap-2'>
							<span>{work.company}</span>&middot;
							<span style={{ color: userPreferences.color }}>
								{work.employmentType}
							</span>
						</p>
					</div>
					<ul className='list-disc pl-4 max-w-[600px] '>
						{work.responsibilities.map((task, index) => (
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
	);
};

export default WorkExperience;
