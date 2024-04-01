import { useContext } from "react";

import { useOutletContext } from "react-router-dom";
import { UserPreferencesContext } from "../../context";
import { PriorityTag, Tag } from "../../components";

const Details = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { project } = useOutletContext();

	return (
		<section
			style={{
				color: userPreferences.shade.text.primaryText,
				fontFamily: userPreferences.font.fontFamily,
				backgroundColor: userPreferences.shade.background,
			}}
		>
			<div className='flex flex-col gap-8'>
				<div className='max-w-[500px] w-full '>
					<h1 className='text-xl mb-1'>Description:</h1>
					<p className='whitespace-normal text-sm md:text-base leading-6'>
						{project?.description || "No description yet"}
					</p>
				</div>

				<div className='max-w-[500px] w-full '>
					<h1 className='text-xl mb-1'>Key Features:</h1>
					<div className='px-2'>
						{project.features.length !== 0 ? (
							<ul className='list-disc pl-4 '>
								{project.features.map((feature, index) => (
									<li
										key={index}
										className='text-sm md:text-base mb-1 whitespace-normal'
									>
										{feature}
									</li>
								))}
							</ul>
						) : (
							<p
								style={{ color: userPreferences.shade.text.secondaryText }}
								className='text-base'
							>
								No Features yet
							</p>
						)}
					</div>
				</div>

				<div className='flex items-start gap-14'>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm'
					>
						Tags:
					</div>
					<div
						style={{ color: userPreferences.shade.text.primaryText }}
						className='flex gap-3 flex-wrap text-sm'
					>
						{project.tag.length !== 0
							? project.tag.map((tag) => (
									<Tag key={tag.id} color={tag.color}>
										{tag.tag}
									</Tag>
							  ))
							: "Add project tags"}
					</div>
				</div>

				<div className='flex items-center gap-9'>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm'
					>
						Priority:
					</div>{" "}
					<PriorityTag tag={project.priority} />
				</div>

				<div className='flex items-center gap-10'>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm'
					>
						Status:
					</div>{" "}
					<div
						style={{
							backgroundColor: project.status.color,
							color: "white",
						}}
						className='capitalize px-3 py-[3px] text-sm rounded-sm'
					>
						{project.status.title}
					</div>
				</div>

				<div className='flex items-center gap-7'>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm'
					>
						StartDate:
					</div>{" "}
					<div className='text-sm'>
						{project.dueDate ? project.startDate : "No date yet"}
					</div>
				</div>
				<div className='flex items-center gap-8'>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm'
					>
						Deadline:
					</div>{" "}
					<div className='text-sm'>
						{project.dueDate ? project.dueDate : "No date yet"}
					</div>
				</div>

				<div className='flex items-start gap-11 max-w-[450px] w-full'>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm'
					>
						Stack:
					</div>
					<div className='min-h-[2rem] flex items-center w-full h-full gap-2 flex-wrap'>
						{project.stack.length !== 0
							? project.stack.map((tech) => (
									<span
										key={tech}
										style={{
											color: userPreferences.shade.text.primaryText,
											borderColor: userPreferences.shade.card,
										}}
										className={`${userPreferences.border} border px-3 py-1 text-xs`}
									>
										{tech}
									</span>
							  ))
							: "Add tech stack"}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Details;
