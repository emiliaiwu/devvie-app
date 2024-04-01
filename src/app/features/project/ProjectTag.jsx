import {
	AddIcon,
	CancelCircleIcon,
	EditCircleIcon,
	MinusIcon,
} from "../../data/icon";
import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext, useState } from "react";
import { HoverAccentColor, Tag } from "../../components";
import ManageTags from "./ManageTags";

const ProjectTag = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const [isManageTagOpen, setIsManageTagOpen] = useState(false);
	const maxTags = 2;
	const {
		isNewProjectOpen,
		handleModalOpen,
		handleModalClose,
		newProject,
		setNewProject,
		allProjectTags,

		generateID,
	} = useContext(ProjectContext);

	function handleSelectedTags(id, tag, color) {
		const exists = newProject.tag.some((item) => item.tag === tag);
		if (!exists && newProject.tag.length <= maxTags) {
			setNewProject((prev) => ({
				...prev,
				tag: [...prev.tag, { id, tag, color }],
			}));
		}
	}

	// handle manage tags
	function handleManageTags() {
		handleModalClose();
		setIsManageTagOpen(true);
	}

	// remove tags
	function handleDeleteTags(tagToDelete) {
		const newProjectTags = newProject.tag.filter(
			(tag) => tag.id !== tagToDelete
		);
		setNewProject((prev) => ({
			...prev,
			tag: newProjectTags,
		}));
	}

	return (
		<div className='w-full relative z-[10]'>
			<div>
				<div className='text-base px-1 mb-3'>Project Tags</div>

				<div
					style={{
						backgroundColor: userPreferences.shade.card,
						borderColor: userPreferences.shade.text.secondaryText,
						color: userPreferences.shade.text.primaryText,
					}}
					className={`${userPreferences.border} flex items-center justify-between px-4 py-3 `}
				>
					<div className='flex-1 flex items-center h-8'>
						{newProject.tag.length > 0 ? (
							<div className='w-full h-full flex items-center'>
								<ul className='flex flex-wrap gap-3 items-center'>
									{newProject.tag.map((tag) => (
										<li key={tag.id}>
											<Tag color={tag.color}>
												<p>{tag.tag}</p>
												<span
													onClick={() => handleDeleteTags(tag.id)}
													className='ml-1 cursor-pointer'
												>
													<CancelCircleIcon className='w-4 h-4' />
												</span>
											</Tag>
										</li>
									))}
								</ul>
							</div>
						) : (
							<p
								style={{
									color: userPreferences.shade.text.secondaryText,
								}}
								className='text-sm sm:text-base'
							>
								Add tags
							</p>
						)}
					</div>

					<div className='cursor-pointer'>
						<HoverAccentColor>
							{isNewProjectOpen.tag ? (
								<span onClick={handleModalClose}>
									<MinusIcon className='w-6 h-6' />
								</span>
							) : (
								<span onClick={() => handleModalOpen("tag")}>
									<AddIcon className='w-6 h-6' />
								</span>
							)}
						</HoverAccentColor>
					</div>
				</div>
			</div>

			{/* tags dropdown */}
			{isNewProjectOpen.tag && (
				<div
					style={{
						backgroundColor: userPreferences.shade.card,
						borderColor: userPreferences.shade.other,
					}}
					className={`${userPreferences.border}
					 lg:w-[320px] w-[280px] sm:w-[300px] pt-6 top-28 left-0 absolute border`}
				>
					<div className='relative'>
						{newProject.tag.length > maxTags && (
							<div
								className={`${userPreferences.border} absolute inset-0 flex justify-center items-center `}
							>
								<h2 className='text-base'>Max Tags Reached</h2>
							</div>
						)}

						<div
							className={` ${
								newProject.tag.length > maxTags
									? "opacity-30 overflow-hidden"
									: "opacity-100 overflow-y-scroll"
							}  h-64  scroll ml-3 mr-2`}
						>
							<ul className='flex flex-col gap-1'>
								{allProjectTags.map((tag) => (
									<li
										key={tag.id}
										onClick={() =>
											handleSelectedTags(tag.id, tag.tag, tag.color)
										}
										className='text-white text-xs p-3  mr-2  cursor-pointer'
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
					<div
						style={{
							color: userPreferences.shade.text.secondaryText,
							borderColor: userPreferences.shade.other,
						}}
						className='flex justify-center items-center p-4 border-t'
					>
						<div onClick={handleManageTags} className='cursor-pointer text-sm sm:text-base'>
							<HoverAccentColor
								className={
									"inline-flex items-center text-base justify-center gap-3"
								}
							>
								<EditCircleIcon className='w-5 h-5' /> <span>Manage Tags</span>
							</HoverAccentColor>
						</div>
					</div>
				</div>
			)}

			{isManageTagOpen && (
				<ManageTags
					setIsManageTagOpen={setIsManageTagOpen}
					generateID={generateID}
				/>
			)}
		</div>
	);
};

export default ProjectTag;
