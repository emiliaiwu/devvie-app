import { useContext, useState } from "react";
import { UserPreferencesContext, UserProfileContext } from "../../context";
import { useAlphanumericID } from "../../../hooks";
import { HoverAccentColor } from "../../components";
import { CancelCircleIcon, DeleteIcon, EditCircleIcon } from "../../data/icon";

const ProjectExperienceForm = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { setUserProfile, userProfile } = useContext(UserProfileContext);
	const [responsibility, setResponsibility] = useState("");
	const [editItem, setEditItem] = useState("");
	const [isUpdatingItem, setIsUpdatingItem] = useState(false);
	const [projectUpdating, setProjectUpdating] = useState(false);
	const generateID = useAlphanumericID();
	const [skill, setSkill] = useState("");
	const newForm = {
		id: generateID(),
		title: "",
		responsibilities: [],
		techStack: [],
	};

	const [formData, setFormData] = useState(newForm);

	// HANDLE ADD INPUT
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleAddSkills = () => {
		// Split the input value by commas and trim each name
		const names = skill.split(",").map((name) => name.trim());
		// Filter out empty names
		const filteredNames = names.filter((name) => name !== "");
		setFormData((prevData) => ({
			...prevData,
			techStack: [...filteredNames],
		}));

		setSkill("");
	};

	const handleRemoveSkills = (i) => {
		setFormData((prevData) => ({
			...prevData,
			techStack: prevData.techStack.filter((name, index) => index !== i),
		}));
	};

	// HANDLE ADD RESPONSIBILITY
	const handleAddResponsibility = () => {
		if (responsibility.trim().length === 0) {
			return;
		} else {
			setFormData((prevData) => ({
				...prevData,
				responsibilities: [...prevData.responsibilities, responsibility],
			}));
		}

		setResponsibility("");
	};

	// EDIT RESPONSIBLITY
	const handleEdit = (item) => {
		setIsUpdatingItem(true);
		setEditItem(item);
		setResponsibility(item);
	};

	// DELETE RESPONSIBILITY
	const handleDelete = (item) => {
		const newListItems = formData.responsibilities.filter(
			(listItem) => item !== listItem
		);
		setFormData((prev) => ({
			...prev,
			responsibilities: newListItems,
		}));
	};

	// HANDLE UPDATE
	const handleUpdateResponsibility = () => {
		const newListItems = formData.responsibilities.filter(
			(listItem) => editItem !== listItem
		);
		setFormData((prevData) => ({
			...prevData,
			responsibilities: [...newListItems, responsibility],
		}));
		setResponsibility("");
		setIsUpdatingItem(false);
	};

	// CANCEL PROJECT EXPERIENCE
	const handleCancel = () => {
		setFormData(newForm);

		setResponsibility("");
	};

	// EDIT project EXPERIENCE
	const handleEditProjectExperience = (project) => {
		setProjectUpdating(true);
		setFormData(project);
		console.log(formData);
	};

	// DELETE project EXPERIENCE
	const handleDeleteProjectExperience = (project) => {
		const newProject = userProfile.projectExperience.filter(
			(item) => item.id !== project.id
		);

		setUserProfile((pre) => ({
			...pre,
			projectExperience: newProject,
		}));
	};

	// ADD WORK EXPERIENCE
	const handleAddProjectExperience = () => {
		setUserProfile((pre) => ({
			...pre,
			projectExperience: [...pre.projectExperience, formData],
		}));

		setFormData(newForm);
	};

	// HANDLE UPDATE WORK EXPERIENCE
	const updateProjectExperience = () => {
		// Check if formData has an ID
		if (formData.id) {
			// Check if there is an existing work experience entry with the same ID
			const indexToUpdate = userProfile.projectExperience.findIndex(
				(experience) => experience.id === formData.id
			);

			if (indexToUpdate !== -1) {
				// Update the existing project experience entry
				setUserProfile((prevProfile) => {
					const updatedProjectExperience = [...prevProfile.projectExperience];
					updatedProjectExperience[indexToUpdate] = formData;

					return {
						...prevProfile,
						projectExperience: updatedProjectExperience,
					};
				});

				// Reset formData
				setFormData(newForm);
			}
		}
	};

	// HANDLE SUBMIT
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='w-full'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col lg:flex-row gap-6 mb-6'
			>
				<label className='w-full'>
					<input
						style={{ borderColor: userPreferences.shade.other }}
						type='text'
						name='title'
						value={formData.title}
						onChange={handleChange}
						placeholder='Project title'
						required
						className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none placeholder:opacity-50`}
					/>
				</label>

				<label className='w-full'>
					<input
						style={{ borderColor: userPreferences.shade.other }}
						type='text'
						value={skill}
						placeholder='Skills separated by comma'
						onChange={(e) => setSkill(e.target.value)}
						className={`${userPreferences.border} text-sm py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
					/>
				</label>
				<button
					onClick={handleAddSkills}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? "white" : "black",
					}}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base lg:w-1/2  w-full  hover:scale-110 transition-all duration-200 ease`}
					type='button'
				>
					Add skills
				</button>
			</form>
			<div
				style={{ borderColor: userPreferences.shade.other }}
				className={`${userPreferences.border} mb-6 text-sm lg:text-base py-3 px-4 w-full h-[120px] bg-transparent border-[1.5px] flex gap-2 flex-wrap`}
			>
				{formData.techStack?.map((skill, index) => (
					<div key={skill}>
						<div
							style={{
								borderColor: userPreferences.shade.other,
								color: userPreferences.shade.text.secondaryText,
							}}
							className={`${userPreferences.border} px-3 py-1 border text-sm flex items-center gap-1 capitalize`}
						>
							{skill}
							<span
								onClick={() => handleRemoveSkills(index)}
								className='cursor-pointer'
							>
								<CancelCircleIcon className='w-4 h-4' />
							</span>
						</div>
					</div>
				))}
			</div>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col md:flex-row items-center gap-6'>
					<label className='w-full'>
						<input
							style={{ borderColor: userPreferences.shade.other }}
							type='text'
							name='firstName'
							value={responsibility}
							placeholder='Enter job responsibility'
							onChange={(e) => setResponsibility(e.target.value)}
							required
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
						/>
					</label>
					<button
						onClick={
							isUpdatingItem
								? handleUpdateResponsibility
								: handleAddResponsibility
						}
						style={{
							backgroundColor: userPreferences.color,
							color: userPreferences.isLightMode ? "white" : "black",
						}}
						className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base md:w-1/2  w-full  hover:scale-[.9] transition-all duration-300 ease`}
						type='button'
					>
						{isUpdatingItem ? "Update" : "Add job responsibility"}
					</button>
				</div>
				<div
					style={{ borderColor: userPreferences.shade.other }}
					className={`${userPreferences.border} text-sm lg:text-base py-3 px-4 w-full h-[180px] bg-transparent border-[1.5px] overflow-y-scroll scroll flex flex-col gap-2`}
				>
					{formData.responsibilities.map((item, index) => (
						<div
							key={index}
							style={{
								borderColor: userPreferences.shade.other,
								color: userPreferences.shade.text.secondaryText,
							}}
							className={`${userPreferences.border} flex justify-between items-start gap-3 py-3  px-4 border`}
						>
							<span className='text-sm whitespace-normal'>{item}</span>{" "}
							<div className='flex justify-between items-center gap-2'>
								<span
									onClick={() => handleEdit(item)}
									className='cursor-pointer'
								>
									<HoverAccentColor>
										<EditCircleIcon className='w-4 h-4' />
									</HoverAccentColor>
								</span>
								<span
									onClick={() => handleDelete(item)}
									className='cursor-pointer'
								>
									<HoverAccentColor>
										<DeleteIcon className='w-4 h-4' />
									</HoverAccentColor>
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-6 mt-6'>
				<button
					style={{ borderColor: userPreferences.shade.other }}
					onClick={handleCancel}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base  w-full lg:w-1/3 border-[1.5px] hover:scale-[.9] transition-all duration-300 ease `}
					type='button'
				>
					Cancel
				</button>
				<button
					onClick={
						projectUpdating
							? updateProjectExperience
							: handleAddProjectExperience
					}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? "white" : "black",
					}}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base w-full lg:w-2/3  hover:scale-[.9] transition-all duration-300 ease`}
					type='button'
				>
					{projectUpdating ? "Update" : "Add project experience"}
				</button>
			</div>

			<div
				style={{ backgroundColor: userPreferences.shade.card }}
				className={`${userPreferences.border} px-5 pt-2 pb-6 mt-8 min-h-[200px] w-full`}
			>
				<div className='flex flex-col gap-4 mt-6 w-full'>
					<h1 className='text-xl'>Project Experience:</h1>
					<div className='flex flex-col gap-8'>
						{userProfile.projectExperience?.map((project) => (
							<div key={project.id} className='flex flex-col gap-1 w-full '>
								<div className='flex justify-start items-center gap-4'>
									<span
										onClick={() => handleEditProjectExperience(project)}
										className='cursor-pointer'
									>
										<HoverAccentColor>
											<EditCircleIcon className='w-5 h-5' />
										</HoverAccentColor>
									</span>
									<span
										onClick={() => handleDeleteProjectExperience(project)}
										className='cursor-pointer'
									>
										<HoverAccentColor>
											<DeleteIcon className='w-5 h-5' />
										</HoverAccentColor>
									</span>
								</div>
								<h1 className='text-lg font-semibold'>{project.title}</h1>
								<div className='flex flex-row gap-1 mb-2 flex-wrap w-full'>
									{project.techStack?.map((tech) => (
										<span style={{color: userPreferences.color}} key={tech} className='text-xs italic'>
											{tech}
										</span>
									))}
								</div>
								<ul className='list-disc pl-4 max-w-[500px]'>
									{project.responsibilities.map((task, index) => (
										<li style={{color: userPreferences.shade.text.secondaryText}} key={index} className='whitespace-normal text-sm'>
											{task}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectExperienceForm;
