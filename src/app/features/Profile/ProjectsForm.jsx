import { useContext, useState } from "react";
import { UserPreferencesContext, UserProfileContext } from "../../context";
import { CancelCircleIcon } from "../../data/icon";
import ProjectCard from "./ProjectCard";
import { useAlphanumericID } from "../../../hooks";

const ProjectsForm = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { userProfile, setUserProfile } = useContext(UserProfileContext);
	const [projectUpdating, setProjectUpdating] = useState(false);
	const [techStack, setTechStack] = useState("");
	const generateID = useAlphanumericID();
	const [formData, setFormData] = useState({
		id: generateID(),
		title: "",
		description: "",
		link: "",
		sourceCode: "",
		techStack: [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleAddSkills = () => {
		// Split the input value by commas and trim each name
		const names = techStack.split(",").map((name) => name.trim());
		// Filter out empty names
		const filteredNames = names.filter((name) => name !== "");
		setFormData((prevData) => ({
			...prevData,
			techStack: [...prevData.techStack, ...filteredNames],
		}));
		// Clear the input field
		setTechStack("");
	};

	const handleRemoveSkills = (i) => {
		setFormData((prevData) => ({
			...prevData,
			techStack: prevData.techStack.filter((name, index) => index !== i),
		}));
	};

	const handleAddProject = () => {
		setUserProfile((prev) => ({
			...prev,
			projects: [...prev.projects, formData],
		}));

		setFormData({
			id: generateID(),
			title: "",
			description: "",
			link: "",
			sourceCode: "",
			techStack: [],
		});
	};

	const handleEditProject = (project) => {
		setProjectUpdating(true);
		setFormData(project);
	};

	const handleDeleteProject = (project) => {
		const newProject = userProfile.projects.filter(
			(item) => item.id !== project.id
		);

		setUserProfile((pre) => ({
			...pre,
			projects: newProject,
		}));
	};

	const handleUpdateProject = () => {
		if (formData.id) {
			// Check if there is an existing work experience entry with the same ID
			const indexToUpdate = userProfile.projects.findIndex(
				(project) => project.id === formData.id
			);

			if (indexToUpdate !== -1) {
				// Update the existing work experience entry
				setUserProfile((prevProfile) => {
					const updatedProjects = [...prevProfile.projects];
					updatedProjects[indexToUpdate] = formData;

					return {
						...prevProfile,
						projects: updatedProjects,
					};
				});

				// Reset formData
				setFormData({
					id: generateID(),
					title: "",
					description: "",
					link: "",
					sourceCode: "",
					techStack: [],
				});
			}
		}

		setProjectUpdating(false);
	};

	return (
		<div>
			<form
				onSubmit={(e) => e.preventDefault()}
				style={{
					color: userPreferences.shade.text.secondaryText,
				}}
				className='w-full flex flex-col gap-6'
			>
				<label className='w-full'>
					<input
						style={{ borderColor: userPreferences.shade.other }}
						type='text'
						name='title'
						value={formData.title}
						placeholder='Title'
						onChange={handleChange}
						className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
					/>
				</label>

				<label
					style={{ borderColor: userPreferences.shade.other }}
					className={`${userPreferences.border} w-full p-2 border-[1.5px]`}
				>
					<textarea
						name='description'
						value={formData.description}
						placeholder='Description'
						onChange={handleChange}
						className={` text-sm lg:text-base py-2 h-[80px] px-4 w-full bg-transparent outline-none scroll `}
					/>
				</label>

				<div className='flex w-full flex-col lg:flex-row gap-6'>
					<label className='w-full lg:w-1/2'>
						<input
							style={{ borderColor: userPreferences.shade.other }}
							type='url'
							name='link'
							value={formData.link}
							placeholder='Project link'
							onChange={handleChange}
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
						/>
					</label>

					<label className='w-full lg:w-1/2'>
						<input
							style={{ borderColor: userPreferences.shade.other }}
							type='url'
							name='sourceCode'
							value={formData.sourceCode}
							placeholder='Source code link'
							onChange={handleChange}
							className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
						/>
					</label>
				</div>

				<div className='flex flex-col gap-6'>
					<div className='flex flex-col md:flex-row items-center gap-6'>
						<label className='w-full'>
							<input
								style={{ borderColor: userPreferences.shade.other }}
								type='text'
								name='firstName'
								value={techStack}
								placeholder='Enter tech stack separated by comma'
								onChange={(e) => setTechStack(e.target.value)}
								className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
							/>
						</label>
						<button
							onClick={() => handleAddSkills()}
							style={{
								backgroundColor: userPreferences.color,
								color: userPreferences.isLightMode ? "white" : "black",
							}}
							className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base md:w-1/2  w-full  hover:scale-[.9] transition-all duration-300 ease`}
							type='button'
						>
							Add tech stack
						</button>
					</div>
					<div
						style={{ borderColor: userPreferences.shade.other }}
						className={`${userPreferences.border} text-sm lg:text-base py-3 px-4 w-full h-[120px] bg-transparent border-[1.5px] flex gap-2 flex-wrap`}
					>
						{formData.techStack.map((skill, index) => (
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
				</div>

				<button
					onClick={projectUpdating ? handleUpdateProject : handleAddProject}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? "white" : "black",
					}}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base  w-full hover:scale-[.9] transition-all duration-300 ease`}
					type='button'
				>
					{projectUpdating ? "Update Project" : "Add project"}
				</button>
			</form>

			<div className='mt-6 flex flex-col md:flex-row flex-wrap justify-center lg:justify-start items-center gap-4'>
				{userProfile.projects.map((project, index) => (
					<ProjectCard
						key={project.title + index}
						project={project}
						handleEditProject={handleEditProject}
						handleDeleteProject={handleDeleteProject}
						background={userPreferences.shade.card}
					/>
				))}
			</div>
		</div>
	);
};

export default ProjectsForm;
