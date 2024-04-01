import { useContext } from "react";
import {
	ProjectContext,
	ToastContext,
	UserPreferencesContext,
} from "../../context";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const CommitForm = ({ project, error, formData, setFormData, setError }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { showToast } = useContext(ToastContext);
	const {
		handleUpdateProject,
		isSubmitting,
		setProjectToBeUpdated,
		setNewProject,
		newProject,
		generateSlug,
	} = useContext(ProjectContext);

	const handleFetch = async () => {
		let shouldExecuteLogic = true; // Flag variable

		try {
			const response = await axios.get(
				`https://api.github.com/repos/${newProject.repoOwner}/${newProject.repoName}/commits`
			);
			handleUpdateProject();
		} catch (error) {
			// If an error occurs, handle it and show a toast message
			setError(error.message);
			showToast(
				"danger",
				"Commits Not found!",
				"Make sure the repo name and owner is correct"
			);

			// Reset newProject values to empty strings
			setNewProject((prev) => ({
				...prev,
				repoOwner: "",
				repoName: "",
			}));

			// Set the flag to false to prevent further logic execution
			shouldExecuteLogic = false;
		}

		// Only execute the logic if shouldExecuteLogic is true
		if (shouldExecuteLogic) {
			handleUpdateProject();
		}
	};

	console.log(newProject.repoOwner);

	const handleRepoOwner = (project, owner) => {
		const formattedUsername = owner.trim().toLowerCase();
		setProjectToBeUpdated(project);
		setNewProject((prev) => ({
			...prev,
			title: project.title,
			slug: generateSlug(project.title),
			description: project.description,
			tag: project.tag,
			priority: project.priority,
			stack: project.stack,
			startDate: project.startDate,
			dueDate: project.dueDate,
			status: project.status,
			repoOwner: formattedUsername,
		}));
	};

	const handleRepoName = (project, repo) => {
		const formattedRepoName = repo.trim().toLowerCase();
		setProjectToBeUpdated(project);
		setNewProject((prev) => ({
			...prev,
			title: project.title,
			slug: generateSlug(project.title),
			description: project.description,
			tag: project.tag,
			priority: project.priority,
			stack: project.stack,
			startDate: project.startDate,
			dueDate: project.dueDate,
			status: project.status,
			repoName: formattedRepoName,
		}));
	};

	return (
		<div>
			<div className='mb-5'>
				<h1 className='text-2xl'>Connect GitHub</h1>
				<p
					style={{
						color: userPreferences.shade.text.secondaryText,
					}}
					className='max-w-[400px] text-sm whitespace-normal'
				>
					Get a quick snapshot of your project's history.
				</p>
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col gap-5'
			>
				<div className='max-w-[500px] w-full flex flex-col gap-1'>
					<label htmlFor='username' className='text-base'>
						Owner username
					</label>
					<input
						type='text'
						id='username'
						name='username'
						value={newProject.repoOwner}
						onChange={(e) => handleRepoOwner(project, e.target.value)}
						className={`${userPreferences.border} w-full py-[10px] px-4 bg-transparent text-sm outline-none `}
						style={{ backgroundColor: userPreferences.shade.other }}
					/>
				</div>

				<div className='max-w-[500px] w-full flex flex-col gap-1'>
					<label htmlFor='repoName' className='text-base'>
						Project repository name
					</label>
					<input
						type='text'
						id='repoName'
						name='repoName'
						value={newProject.repoName}
						onChange={(e) => handleRepoName(project, e.target.value)}
						className={`${userPreferences.border} w-full py-[10px] px-4 bg-transparent outline-none text-sm`}
						style={{ backgroundColor: userPreferences.shade.other }}
					/>
				</div>
				<button
					onClick={handleFetch}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? "white" : "black",
					}}
					className={`${userPreferences.border} h-10 max-w-[500px] w-full mt-4 flex justify-center items-center hover:opacity-70 transition-all duration-200 ease`}
				>
					{isSubmitting ? (
						<ClipLoader loading={true} color={"#FFFFFF"} size={28} />
					) : (
						"Fetch commits"
					)}
				</button>
			</form>
		</div>
	);
};

export default CommitForm;
