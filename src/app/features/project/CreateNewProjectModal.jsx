import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext, useRef, useEffect } from "react";
import ProjectTag from "./ProjectTag";
import ProjectStatus from "./ProjectStatus";
import ProjectPriority from "./ProjectPriority";
import { ChooseDueDate, ChooseStartDate } from "../../components";
import ProjectTechStack from "./ProjectTechStack";
import { ClipLoader } from "react-spinners";
import { CheckedIcon, XIcon } from "../../data/icon";
import ProjectFeature from "./ProjectFeature";

const CreateNewProjectModal = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		isSubmitting,
		createNewProject,
		handleCancel,
		isCreateNewProjectModalOpen,
		isUpdating,
		handleUpdateProject,
		newProject,
		setNewProject,
		isNoDate,
		setIsNoDate,
		generateSlug,
	} = useContext(ProjectContext);

	const contentRef = useRef(null);

	// reset scroll to top when modal opens
	useEffect(() => {
		if (isCreateNewProjectModalOpen) {
			contentRef.current.scrollTop = 0;
		}
	}, [isCreateNewProjectModalOpen]);

	const handleInputChange = (fieldName, value) => {
		if (fieldName === "title") {
			setNewProject((prevFormValues) => ({
				...prevFormValues,
				slug: generateSlug(value),
				[fieldName]: value,
			}));
		} else {
			setNewProject((prevFormValues) => ({
				...prevFormValues,
				[fieldName]: value,
			}));
		}
	};

	return (
		<section
			style={{
				backgroundColor: userPreferences.shade.background,
			}}
			className={`mx-auto min-h-screen h-full lg:h-screen px-2 w-full lg:w-[600px] `}
		>
			<div
				style={{ fontFamily: userPreferences.font.fontFamily }}
				className='flex flex-col py-4 md:py-8'
			>
				<h1
					style={{ color: userPreferences.shade.text.primaryText }}
					className='text-xl sm:text-2xl lg:text-3xl p-2 md:p-5'
				>
					Create New Project
				</h1>
				<div
					style={{ color: userPreferences.shade.text.primaryText }}
					ref={contentRef}
					className=' gap-6 justify-between overflow-y-scroll scroll h-screen p-2 md:p-5'
				>
					{/* PROJECT FORM */}
					<form className='w-full mb-4'>
						<div className='flex flex-col gap-2 mb-4'>
							<label className='block text-sm sm:text-base'> Title </label>
							<input
								style={{ backgroundColor: userPreferences.shade.card }}
								type='text'
								id='title'
								name='title'
								placeholder='Enter your project title'
								value={newProject.title}
								onChange={(e) => handleInputChange("title", e.target.value)}
								className={`${userPreferences.border} w-full px-4 py-3 focus:outline-none text-sm sm:text-base mb-1`}
							/>
						</div>

						<div className='flex flex-col gap-2 mb-4 '>
							<label htmlFor='description'>Description</label>
							<div
								style={{ backgroundColor: userPreferences.shade.card }}
								className={`${userPreferences.border} py-3 overflow-hidden mb-1 p-3 md:pl-5 md:pr-2 m-auto w-full`}
							>
								<textarea
									style={{ backgroundColor: userPreferences.shade.card }}
									id='description'
									value={newProject.description}
									onChange={(e) =>
										handleInputChange("description", e.target.value)
									}
									placeholder='Enter your project description'
									rows={5}
									className={`focus:outline-none text-sm scroll p-2 leading-8 w-full`}
								/>
							</div>
						</div>

						<ProjectFeature />
					</form>

					<div className='w-full flex flex-col gap-8 mb-10'>
						<div className='flex flex-col gap-3'>
							<div className='flex flex-col gap-2'>
								<ProjectTag />
							</div>
							<ProjectStatus />

							<ProjectPriority />
							<div
								style={{ backgroundColor: userPreferences.shade.card }}
								className={`${userPreferences.border} flex items-center my-2 p-4`}
							>
								{/* Checkbox for "No Date" option */}
								<label className='flex items-center gap-2 relative text-sm sm:text-base'>
									<input
										onChange={() => setIsNoDate(!isNoDate)}
										type='checkbox'
										checked={isNoDate}
										className='opacity-0 w-5 h-5 cursor-pointer'
									/>
									{isNoDate ? (
										<span className='absolute left-0 cursor-pointer'>
											<CheckedIcon className='w-5 h-5 ' />
										</span>
									) : (
										<span className='absolute left-0 cursor-pointer'>
											<XIcon className='w-5 h-5' />
										</span>
									)}
									No date yet
								</label>
							</div>

							{!isNoDate && (
								<div className='flex flex-col sm:flex-row justify-between gap-3 '>
									<ChooseStartDate />
									<div className='w-full'>
										<ChooseDueDate />
									</div>
								</div>
							)}

							<div>
								<ProjectTechStack />
							</div>
						</div>
						<div
							style={{
								color: `${userPreferences.isLightMode ? "white" : "black"}`,
							}}
							className='flex justify-between items-center mb-28'
						>
							<button
								onClick={handleCancel}
								style={{ backgroundColor: userPreferences.color }}
								className={`${userPreferences.border} h-11 px-7 text-sm  font-medium hover:opacity-60 transition-opacity duration-200 ease`}
							>
								Cancel
							</button>
							<button
								onClick={isUpdating ? handleUpdateProject : createNewProject}
								style={{ backgroundColor: userPreferences.color }}
								className={`${userPreferences.border} h-11 w-36 text-sm  font-medium hover:opacity-60 transition-opacity duration-200 ease flex justify-center items-center`}
							>
								{isSubmitting ? (
									<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
								) : isUpdating ? (
									"Update project"
								) : (
									"Create project"
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateNewProjectModal;
