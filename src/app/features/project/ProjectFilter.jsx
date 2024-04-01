import { useContext, useState } from "react";
import {
	ProjectContext,
	UserPreferencesContext,
	UserProfileContext,
} from "../../context";
import { HoverAccentColor, PriorityTag, Tag } from "../../components";
import { CancelCircleIcon, DropdownArrowIcon } from "../../data/icon";
import { priorityTags } from "../../data/projectData";

const ProjectFilter = () => {
	const {
		filterStack,
		setFilterStack,
		filterTag,
		setFilterTag,
		filterPriority,
		setFilterPriority,
		allProjectTags,
		handleFilterProject,
		handleClearFilters,
		handleClearFilter,
	} = useContext(ProjectContext);
	const { userProfile } = useContext(UserProfileContext);
	const sortedTechStack = userProfile?.techStack.slice().sort();

	const { userPreferences } = useContext(UserPreferencesContext);
	const [isStackOpen, setIsStackOpen] = useState(false);
	const [isPriorityOpen, setIsPriorityOpen] = useState(false);
	const [isTagOpen, setIsTagOpen] = useState(false);

	const handleTag = () => {
		setFilterTag(null);
		handleClearFilter();
	};

	const handleStack = () => {
		setFilterStack(null);
		handleClearFilter();
	};

	const handlePriority = () => {
		setFilterPriority(null);
		handleClearFilter();
	};

	return (
		<div
			className={`${userPreferences.border} 
             flex flex-col md:flex-row gap-4 items-center `}
		>
			<div className='flex gap-4 flex-col md:flex-row justify-between w-full'>
				<div className='relative w-full'>
					<div
						style={{
							backgroundColor: userPreferences.shade.card,
							color: userPreferences.shade.text.primaryText,
						}}
						className={`${userPreferences.border} flex justify-between items-center py-3 px-4 w-full h-12 z-[50]`}
					>
						{filterStack ? (
							<p
								style={{
									borderColor: userPreferences.shade.other,
								}}
								className='pl-3 pr-2 py-[5px] rounded-2xl border text-sm flex justify-between items-center'
							>
								{filterStack}{" "}
								<span onClick={handleStack} className='ml-2'>
									<CancelCircleIcon className='w-4 h-4 cursor-pointer' />
								</span>
							</p>
						) : (
							"Stack"
						)}

						<span
							onClick={() => setIsStackOpen(!isStackOpen)}
							className='cursor-pointer'
						>
							<HoverAccentColor>
								<DropdownArrowIcon
									className={`${
										isStackOpen ? "rotate-180" : ""
									} w-6 h-6 transition-all duration-200 ease`}
								/>
							</HoverAccentColor>
						</span>
					</div>

					{isStackOpen && (
						<div
							onMouseLeave={() => setIsStackOpen(false)}
							style={{
								backgroundColor: userPreferences.shade.card,
								borderColor: userPreferences.shade.other,
							}}
							className={`${userPreferences.border} py-5 pl-4 pr-3 absolute w-full top-16 border z-[50]`}
						>
							<div className='h-56 overflow-y-scroll scroll flex justify-center items-center '>
								{sortedTechStack.length === 0 ? (
									<p
										style={{ color: userPreferences.color }}
										className='whitespace-normal text-base max-w-[200px] h-full flex justify-center items-center'
									>
										To include your tech stack, please visit your profile.
									</p>
								) : (
									<ul className='flex flex-col gap-2'>
										{sortedTechStack.map((tech) => (
											<li
												key={tech}
												className='text-white text-sm p-2 cursor-pointer'
												onClick={() => setFilterStack(tech)}
											>
												<span
													style={{
														borderColor: userPreferences.shade.other,
													}}
													className='px-3 py-[5px] rounded-2xl border'
												>
													{tech}
												</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					)}
				</div>

				<div className='relative w-full'>
					<div
						style={{
							backgroundColor: userPreferences.shade.card,
							color: userPreferences.shade.text.primaryText,
						}}
						className={`${userPreferences.border} flex justify-between items-center py-3 px-4 h-12 w-full`}
					>
						{filterTag ? (
							<Tag color={filterTag?.color}>
								<p>{filterTag?.tag}</p>
								<span onClick={handleTag} className='ml-2'>
									<CancelCircleIcon className='w-4 h-4 cursor-pointer' />
								</span>
							</Tag>
						) : (
							"Tag"
						)}

						<span
							onClick={() => setIsTagOpen(!isTagOpen)}
							className='cursor-pointer'
						>
							<HoverAccentColor>
								<DropdownArrowIcon
									className={`${
										isTagOpen ? "rotate-180" : ""
									} w-6 h-6 transition-all duration-200 ease`}
								/>
							</HoverAccentColor>
						</span>
					</div>

					{isTagOpen && (
						<div
							onMouseLeave={() => setIsTagOpen(false)}
							style={{
								backgroundColor: userPreferences.shade.card,
								borderColor: userPreferences.shade.other,
							}}
							className={`${userPreferences.border} py-5 pl-4 pr-3 absolute w-full top-16 border z-[40]`}
						>
							<div className='h-56 overflow-y-scroll scroll'>
								<ul className='flex flex-col gap-1'>
									{allProjectTags.map((tag) => (
										<li
											key={tag.id}
											className='text-white text-xs p-3  mr-2  cursor-pointer'
											onClick={() => setFilterTag(tag)}
										>
											<span
												style={{ backgroundColor: tag.color }}
												className='px-3 py-[5px] rounded-2xl '
											>
												{tag.tag}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>

				<div className='relative w-full'>
					<div
						style={{
							backgroundColor: userPreferences.shade.card,
							color: userPreferences.shade.text.primaryText,
						}}
						className={`${userPreferences.border} flex justify-between items-center py-3 px-4 w-full h-12`}
					>
						{filterPriority ? (
							<div className='flex justify-between items-center'>
								<PriorityTag tag={filterPriority} />
								<span
									style={{ color: filterPriority.color }}
									onClick={handlePriority}
									className='ml-2 cursor-pointer'
								>
									<CancelCircleIcon className='w-5 h-5' />
								</span>
							</div>
						) : (
							"Priority"
						)}

						<span
							onClick={() => setIsPriorityOpen(!isPriorityOpen)}
							className='cursor-pointer'
						>
							<HoverAccentColor>
								<DropdownArrowIcon
									className={`${
										isPriorityOpen ? "rotate-180" : ""
									} w-6 h-6 transition-all duration-200 ease`}
								/>
							</HoverAccentColor>
						</span>
					</div>

					{isPriorityOpen && (
						<div
							onMouseLeave={() => setIsPriorityOpen(false)}
							style={{
								backgroundColor: userPreferences.shade.card,
								borderColor: userPreferences.shade.other,
							}}
							className={`${userPreferences.border} py-5 pl-4 pr-3 absolute w-full top-16 border`}
						>
							<div className='h-56 '>
								<ul className='flex flex-col gap-3'>
									{priorityTags.map((tag, index) => (
										<li
											key={index}
											className='capitalize p- flex items-center cursor-pointer hover:opacity-70'
											onClick={() => setFilterPriority(tag)}
										>
											<PriorityTag tag={tag} />
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>

			<button
				onClick={handleFilterProject}
				style={{ backgroundColor: userPreferences.color }}
				className={`${userPreferences.border} h-10 px-7 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease flex justify-center items-center`}
			>
				Apply
			</button>
		</div>
	);
};

export default ProjectFilter;
