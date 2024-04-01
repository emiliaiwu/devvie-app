import {
	ProjectContext,
	ToastContext,
	UserPreferencesContext,
} from "../../context";
import { useContext, useState } from "react";
import {
	CancelCircleIcon,
	DeleteIcon,
	EditCircleIcon,
	TagIcon,
} from "../../data/icon";
import { projectTags } from "../../data/projectData";
import { HoverAccentColor, Tag } from "../../components";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { ClipLoader } from "react-spinners";

const ManageTags = ({ setIsManageTagOpen, generateID }) => {
	const [selectedColor, setSelectedColor] = useState("#00b287");
	const [isColorOpen, setIsColorOpen] = useState(false);
	const [newTag, setNewTag] = useState("");
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		setAllProjectTags,
		allProjectTags,
		userId,
		setIsSubmitting,
		isSubmitting,
	} = useContext(ProjectContext);
	const [tagToBeUpdated, setTagToBeUpdated] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const { showToast } = useContext(ToastContext);

	const handleColor = (color) => {
		setSelectedColor(color);
		setIsColorOpen(false);
		console.log(isColorOpen);
	};

	const handleTagInput = (e) => {
		setNewTag(e.target.value);
	};

	const handleTagToBeUpdated = (tag) => {
		setIsUpdating(true);
		setTagToBeUpdated(tag);
		setNewTag(tag.tag);
		setSelectedColor(tag.color);
	};

	// submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (newTag.trim() === "") {
			return;
		}

		const tagExists = allProjectTags.some((tag) => tag.tag === newTag);

		if (tagExists) {
			showToast("info", "Tag already exists!", "Create a new tag");
		} else {
			const newTagObject = {
				id: generateID(),
				tag: newTag,
				color: selectedColor,
			};

			try {
				const tagRef = doc(firestore, "projectTags", userId);
				const tagSnapshot = await getDoc(tagRef);

				if (tagSnapshot.exists()) {
					// If the document already exists, update the tags
					const existingTags = tagSnapshot.data().tags || [];
					const updatedTags = [...existingTags, newTagObject];

					await setDoc(tagRef, { tags: updatedTags });
					setAllProjectTags(updatedTags);
				} else {
					// If the document does not exist, create a new one with the new tag
					await setDoc(tagRef, { tags: [newTagObject] });
					setAllProjectTags([newTagObject]);
				}

				showToast(
					"success",
					"New tag created!",
					"Check the Tag list to use tag"
				);
				setIsSubmitting(false);
			} catch (error) {
				setIsSubmitting(false);
				showToast("danger", "Error creating tag", error.message);
			}
		}

		setSelectedColor("#00b287");
		setIsColorOpen(false);
		setNewTag("");
	};

	// update
	const handleUpdate = async (e) => {
		setIsSubmitting(true);
		e.preventDefault();

		if (newTag.trim() === "") {
			return;
		}

		const tagExists = allProjectTags.some(
			(tag) => tag.tag === newTag && tag.color === selectedColor
		);

		if (tagExists) {
			showToast("info", "Tag already exists!", "Create a new tag");
		} else {
			if (tagToBeUpdated) {
				const updatedTags = allProjectTags.map((tag) =>
					tag.id === tagToBeUpdated.id
						? { id: tag.id, tag: newTag, color: selectedColor }
						: tag
				);

				// Update the tags in the Firestore database
				try {
					const tagRef = doc(firestore, "projectTags", userId);
					await updateDoc(tagRef, { tags: updatedTags });
					showToast(
						"success",
						"Tag has been Updated!",
						"Check the list to use tag"
					);
					setIsSubmitting(false);
				} catch (error) {
					showToast("danger", "Error updating tag", error.message);
					setIsSubmitting(false);
				}

				// Update the state with the new tags
				const sortedTags = [...updatedTags].sort((a, b) =>
					a.tag.localeCompare(b.tag)
				);
				setAllProjectTags(sortedTags);
			}
		}

		setSelectedColor("#00b287");
		setNewTag("");
		setIsUpdating(false);
		setIsColorOpen(false);
		setTagToBeUpdated(null);
	};

	// delete
	const handleDelete = async (tagToDelete) => {
		try {
			const updatedTags = allProjectTags.filter(
				(tag) => tag.id !== tagToDelete
			);
			await updateDoc(doc(firestore, "projectTags", userId), {
				tags: updatedTags,
			});
			setAllProjectTags(updatedTags);
			showToast("success", "Tag has been deleted!", "Create a new tag");
		} catch (error) {
			showToast("danger", "Error deleting tag", error.message);
		}
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 overflow-y-scroll min-h-screen h-full'>
			<div className='relative flex justify-center items-center mt-24'>
				<div
					onClick={() => setIsManageTagOpen(false)}
					style={{
						color: userPreferences.shade.text.primaryText,
					}}
					className='absolute right-5 top-4 cursor-pointer'
				>
					<HoverAccentColor>
						<CancelCircleIcon className='w-6 h-6 ' />
					</HoverAccentColor>
				</div>
				<div
					style={{ backgroundColor: userPreferences.shade.card }}
					className={`${userPreferences.border} w-[300px] xs:w-[320px] ss:w-[380px] md:w-[450px] flex flex-col px-6 pb-4 gap-4`}
				>
					<h1
						style={{
							color: userPreferences.shade.text.primaryText,
							borderColor: userPreferences.shade.other,
						}}
						className='text-xl w-full text-center self-center border-b pt-6 pb-4 mb-2'
					>
						Manage Project Tags
					</h1>
					<div className='w-full mb-2'>
						<h2 className='text-base mb-3 flex items-center px-1'>
							Current Tags
							<TagIcon className='ml-2 w-4 h-4' />
						</h2>
						<div
							style={{ backgroundColor: userPreferences.shade.background }}
							className={`${userPreferences.border} pl-3 py-4 pr-2 `}
						>
							<ul className='overflow-y-scroll h-52 scroll'>
								{allProjectTags.map((tag, index) => (
									<li
										key={index}
										className='text-white text-xs px-3 py-[10px] flex justify-between items-center'
									>
										<Tag color={tag.color}>{tag.tag}</Tag>
										<div
											style={{
												color: userPreferences.shade.text.primaryText,
											}}
											className='flex gap-4 items-center h-full'
										>
											<span
												onClick={() => handleTagToBeUpdated(tag)}
												className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200 ease'
											>
												<EditCircleIcon className='w-[18px] h-[18px]' />{" "}
											</span>
											<span
												onClick={() => handleDelete(tag.id)}
												className='cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200 ease'
											>
												<DeleteIcon className='w-[18px] h-[18px]' />
											</span>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='w-full mb-5'>
						<h2 className='text-base flex items-center mb-3 px-1'>
							Add New Tags
							<TagIcon className='ml-2 w-4 h-4' />{" "}
						</h2>

						{/* form */}
						<form
							onSubmit={isUpdating ? handleUpdate : handleSubmit}
							style={{ color: userPreferences.shade.text.primaryText }}
							className='flex flex-col md:flex-row justify-between items-center gap-3 w-full'
						>
							{/* tag */}
							<div className='w-full flex-1'>
								<input
									style={{ backgroundColor: userPreferences.shade.background }}
									placeholder='Tag Name'
									value={newTag}
									className={`${userPreferences.border} w-full h-11 pl-4 pr-2 text-sm focus:outline-none`}
									onChange={handleTagInput}
								/>
							</div>

							{/* color */}
							<div
								onClick={() => setIsColorOpen(true)}
								style={{ backgroundColor: userPreferences.shade.background }}
								className={`${userPreferences.border} h-11 flex items-center px-2 gap-2 w-full justify-center flex-1`}
							>
								<div className='pl-2'>
									<div
										style={{
											backgroundColor: `${
												selectedColor === "" ? "#3914fe" : selectedColor
											}`,
										}}
										className='h-4 w-4'
									></div>
								</div>
								<input
									style={{ color: userPreferences.shade.text.secondaryText }}
									value={selectedColor}
									className={`w-full  pr-2 text-sm focus:outline-none bg-transparent h-11`}
									onChange={(e) => setSelectedColor(e.target.value)}
								/>
							</div>

							<button
								style={{ backgroundColor: userPreferences.color }}
								className={`${userPreferences.border} h-10 px-7 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease w-24 `}
							>
								{isSubmitting ? (
									<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
								) : isUpdating ? (
									"Update"
								) : (
									"Create"
								)}
							</button>
						</form>

						<div
							className={`${
								isColorOpen ? "opacity-100" : "opacity-0"
							} border-2 border-white bg-black absolute w-56 bottom-28 left-44 transition-opacity duration-150 ease`}
						>
							<ul className='grid grid-cols-7'>
								{projectTags.map((tag, index) => (
									<li
										style={{ backgroundColor: tag.color }}
										key={index}
										className='w-8 h-8 hover:opacity-50'
										onClick={() => handleColor(tag.color)}
									></li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageTags;
