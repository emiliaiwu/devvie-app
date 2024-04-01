import { useContext, useState } from "react";
import { ProjectContext, UserPreferencesContext } from "../../context";
import {
	DeleteIcon,
	EditCircleIcon,
	StatusIcon,
	TaskIcon,
} from "../../data/icon";
import { HoverAccentColor } from "../../components";
import { NavLink } from "react-router-dom";
import ChangeStatus from "./ChangeStatus";
import { ClipLoader } from "react-spinners";

const ProjectCardModal = ({ project, setIsOpen }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		handleEditProject,
		handleDeleteProject,
		handleUpdateProject,
		handleChangeStatus,
		isSubmitting,
	} = useContext(ProjectContext);
	const [isStatusOpen, setIsStatusOpen] = useState(false);

	const handleEdit = (project) => {
		handleEditProject(project);
		setIsOpen(false);
	};

	const handleCancel = () => {
		setIsOpen(false);
		setIsStatusOpen(false);
	};

	const handleChange = (project) => {
		handleChangeStatus(project);
		setIsStatusOpen(true);
	};

	const handleDelete = (project) => {
		handleDeleteProject(project.id, project.columnId);
		setIsOpen(false);
	};

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.other,
				color: userPreferences.shade.text.primaryText,
			}}
			className={`${userPreferences.border} w-44 h-44 flex`}
		>
			{isStatusOpen && (
				<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80'>
					<div
						style={{ backgroundColor: userPreferences.shade.card }}
						className={`${userPreferences.border} py-7 w-[280px] xs:w-[320px] ss:w-[360px] md:w-[400px] flex flex-col items-center gap-3`}
					>
						<div className='w-[250px]  ss:w-[300px] flex justify-center items-center flex-col gap-3'>
							<h1 className='px-2 text-xl w-full'>Change Project Status</h1>
							<ChangeStatus project={project} />

							<div className='flex items-center gap-4 justify-between w-full mt-2'>
								<button
									onClick={handleCancel}
									style={{ backgroundColor: userPreferences.color }}
									className={`${userPreferences.border} w-full h-11 px-7 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease`}
								>
									Cancel
								</button>
								<button
									onClick={handleUpdateProject}
									style={{ backgroundColor: userPreferences.color }}
									className={`${userPreferences.border} w-full h-11 px-7 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease flex justify-center items-center`}
								>
									{isSubmitting ? (
										<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
									) : (
										"Update"
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='flex flex-col gap-2 w-full h-full justify-center px-4'>
				<HoverAccentColor>
					<button
						onClick={() => handleEdit(project)}
						className='flex items-center gap-2 text-sm cursor-pointer p-1'
					>
						<EditCircleIcon className='w-[18px] h-[18px]' />{" "}
						<span>Edit project</span>
					</button>
				</HoverAccentColor>
				<HoverAccentColor>
					<button
						onClick={() => handleChange(project)}
						className='flex items-center gap-2  text-sm cursor-pointer p-1'
					>
						<StatusIcon className='w-[18px] h-[18px]' />{" "}
						<span>Change status</span>
					</button>
				</HoverAccentColor>
				<HoverAccentColor>
					<button
						onClick={() => handleDelete(project)}
						className='flex items-center gap-2  text-sm cursor-pointer p-1'
					>
						<DeleteIcon className='w-[18px] h-[18px]' />{" "}
						<span>Delete project</span>
					</button>
				</HoverAccentColor>

				<HoverAccentColor>
					<NavLink
						to={`/user/projects/${project.slug}`}
						className='flex items-center gap-2 text-sm cursor-pointer p-1'
					>
						<TaskIcon className='w-[18px] h-[18px]' />{" "}
						<span>Open taskboard</span>
					</NavLink>
				</HoverAccentColor>
			</div>
		</div>
	);
};

export default ProjectCardModal;
