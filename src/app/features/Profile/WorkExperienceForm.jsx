import { useContext, useState } from "react";
import { UserPreferencesContext, UserProfileContext } from "../../context";
import {
	CheckCircle,
	DeleteIcon,
	DropdownArrowIcon,
	EditCircleIcon,
} from "../../data/icon";
import { useAlphanumericID } from "../../../hooks";
import { HoverAccentColor } from "../../components";
import EmploymentType from "./EmploymentType";

const WorkExperienceForm = () => {
	const generateID = useAlphanumericID();
	const { userPreferences } = useContext(UserPreferencesContext);
	const { setUserProfile, userProfile } = useContext(UserProfileContext);
	const [responsibility, setResponsibility] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [editItem, setEditItem] = useState("");
	const [isUpdatingItem, setIsUpdatingItem] = useState(false);
	const [workUpdating, setWorkUpdating] = useState(false);
	const employmentTypes = [
		"Full-time",
		"Part-time",
		"Freelance",
		"Internship",
		"Contract",
	];
	const [formData, setFormData] = useState({
		jobTitle: "",
		id: generateID(),
		company: "",
		location: "",
		startDate: "",
		endDate: "",
		employmentType: "",
		isPresent: false,
		responsibilities: [],
	});

	// HANDLE CHANGE FOR INPUTS
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// CHECK CURRENT WORKING
	const handleCheck = () => {
		setFormData((prevData) => ({
			...prevData,
			isPresent: !prevData.isPresent,
		}));
	};

	// ADD RESPONSIBILITY
	const handleAddResponsibility = () => {
		setFormData((prevData) => ({
			...prevData,
			responsibilities: [...prevData.responsibilities, responsibility],
		}));
		setResponsibility("");
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

	// HANDLE UPDATE WORK EXPERIENCE
	const updateWorkExperience = () => {
		// Check if formData has an ID
		if (formData.id) {
			// Check if there is an existing work experience entry with the same ID
			const indexToUpdate = userProfile.workExperience.findIndex(
				(experience) => experience.id === formData.id
			);

			if (indexToUpdate !== -1) {
				// Update the existing work experience entry
				setUserProfile((prevProfile) => {
					const updatedWorkExperience = [...prevProfile.workExperience];
					updatedWorkExperience[indexToUpdate] = formData;

					return {
						...prevProfile,
						workExperience: updatedWorkExperience,
					};
				});

				// Reset formData
				setFormData({
					jobTitle: "",
					id: generateID(),
					company: "",
					location: "",
					startDate: "",
					endDate: "",
					employmentType: "",
					isPresent: false,
					responsibilities: [],
				});
			}
		}
	};


	// ADD WORK EXPERIENCE
	const handleAddWorkExperience = () => {
		setUserProfile((pre) => ({
			...pre,
			workExperience: [...pre.workExperience, formData],
		}));

		setFormData({
			jobTitle: "",
			id: generateID(),
			company: "",
			location: "",
			startDate: "",
			endDate: "",
			employmentType: "",
			isPresent: false,
			responsibilities: [],
		});
	};

	// CANCEL WORK EXPERIENCE
	const handleCancel = () => {
		setFormData({
			jobTitle: "",
			id: generateID(),
			company: "",
			location: "",
			startDate: "",
			endDate: "",
			employmentType: "",
			isPresent: false,
			responsibilities: [],
		});

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

	// EDIT WORK EXPERIENCE
	const handleEditWorkExperience = (work) => {
		setWorkUpdating(true);
		setFormData(work);
		
	};

	// DELETE WORK EXPERIENCE
	const handleDeleteWorkExperience = (work) => {
		const newWork = userProfile.workExperience.filter(
			(item) => item.id !== work.id
		);

		setUserProfile((pre) => ({
			...pre,
			workExperience: newWork,
		}));
	};

	return (
		<div className='w-full'>
			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col gap-6 mb-6'
			>
				<div className='flex md:flex-row flex-col gap-6'>
					<label className='w-full lg:w-1/2'>
						<input
							style={{ borderColor: userPreferences.shade.other }}
							type='text'
							name='company'
							value={formData.company}
							onChange={handleChange}
							placeholder='Company'
							required
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
						/>
					</label>

					<label className='w-full lg:w-1/2'>
						<input
							style={{ borderColor: userPreferences.shade.other }}
							type='text'
							name='location'
							value={formData.location}
							onChange={handleChange}
							placeholder='Location'
							required
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
						/>
					</label>
				</div>{" "}
				<div className='flex lg:flex-row flex-col gap-6'>
					<label className='w-full lg:w-1/2'>
						<input
							style={{ borderColor: userPreferences.shade.other }}
							type='text'
							name='jobTitle'
							value={formData.jobTitle}
							onChange={handleChange}
							placeholder='Job title'
							required
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
						/>
					</label>
					<div className='w-full lg:w-1/2 '>
						<EmploymentType
							employmentType={formData.employmentType}
							setFormData={setFormData}
						/>
					</div>
					<div className='flex r items-center gap-2'>
						<div
							style={{
								backgroundColor: userPreferences.color,
								color: userPreferences.isLightMode ? "white" : "black",
							}}
							className={`${userPreferences.border} py-2 px-4 text-sm `}
						>
							Currently Employed?
						</div>
						<label className='cursor pointer flex justify-center items-center relative'>
							<input
								type='checkbox'
								className='w-6 h-6 bg-transparent opacity-0 '
								checked={formData.isPresent}
								onChange={handleCheck}
							/>
							{formData.isPresent ? (
								<CheckCircle className='w-6 h-6 absolute cursor-pointer' />
							) : (
								<div
									style={{
										borderColor: userPreferences.shade.text.primaryText,
									}}
									className='w-5 h-5 rounded-full border-2 absolute cursor-pointer'
								></div>
							)}
						</label>
					</div>
				</div>
				<div className='flex md:flex-row flex-col gap-6'>
					<label className='w-full lg:w-1/2 flex flex-col gap-2 text-sm lg:text-base'>
						Start Date:
						<input
							style={{
								borderColor: userPreferences.shade.other,
								color: userPreferences.shade.text.secondaryText,
							}}
							type='date'
							name='startDate'
							value={formData.startDate}
							onChange={handleChange}
							required
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none uppercase `}
						/>
					</label>

					<label className='w-full lg:w-1/2 flex flex-col gap-2 text-sm lg:text-base'>
						End Date:
						<input
							style={{
								borderColor: userPreferences.shade.other,
								color: userPreferences.shade.text.secondaryText,
							}}
							type='date'
							name='endDate'
							value={formData.endDate}
							onChange={handleChange}
							disabled={formData.isPresent}
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none uppercase `}
						/>
					</label>
				</div>
			</form>

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
						className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base md:w-1/2  w-full hover:scale-[.9] transition-all duration-300 ease`}
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
			<div className='flex flex-col md:flex-row gap-2 md:gap-6 mt-6'>
				<button
					style={{ borderColor: userPreferences.shade.other }}
					onClick={handleCancel}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base w-full lg:w-1/3 border-[1.5px] hover:scale-[.9] transition-all duration-300 ease`}
					type='button'
				>
					Cancel
				</button>
				<button
					onClick={
						workUpdating ? updateWorkExperience : handleAddWorkExperience
					}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? "white" : "black",
					}}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base w-full lg:w-2/3 hover:scale-[.9] transition-all duration-300 ease`}
					type='button'
				>
					{workUpdating ? "Update" : "Add work experience"}
				</button>
			</div>

			<div
				style={{ backgroundColor: userPreferences.shade.card }}
				className={`${userPreferences.border} px-5 pt-2 pb-6 mt-8 min-h-[200px]`}
			>
				<div className='flex flex-col gap-4 mt-6'>
					<h1 className='text-xl'>Work Experience:</h1>
					<div className='flex flex-col gap-8'>
						{userProfile.workExperience.map((work) => (
							<div key={work.id} className='flex justify-between items-start'>
								<div className='flex flex-col gap-3 '>
									<div className='flex flex-col gap-1'>
										<div className='flex justify-start items-center gap-4'>
											<span
												onClick={() => handleEditWorkExperience(work)}
												className='cursor-pointer'
											>
												<HoverAccentColor>
													<EditCircleIcon className='w-5 h-5' />
												</HoverAccentColor>
											</span>
											<span
												onClick={() => handleDeleteWorkExperience(work)}
												className='cursor-pointer'
											>
												<HoverAccentColor>
													<DeleteIcon className='w-5 h-5' />
												</HoverAccentColor>
											</span>
										</div>
										<h1 className='whitespace-normal text-lg font-semibold'>{work.jobTitle}</h1>
										<p style={{color: userPreferences.color}} className='text-sm flex flex-row gap-2'>
											<span>{work.company}</span>&middot;
											<span>{work.employmentType}</span>
										</p>
										<p
											style={{
												color: userPreferences.shade.text.secondaryText,
											}}
											className='text-xs italic flex flex-row gap-2'
										>
											<span>{work.startDate}</span> {"-"}
											<span>{work.isPresent ? "Present" : work.endDate}</span>
										</p>
									</div>
									<ul className='list-disc pl-4 max-w-[700px]'>
										{work.responsibilities.map((task, index) => (
											<li style={{color: userPreferences.shade.text.secondaryText}} key={index} className='whitespace-normal text-sm py-1'>
												{task}
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkExperienceForm;
