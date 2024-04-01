import { useContext, useState } from "react";
import { UserPreferencesContext } from "../../context";
import {
	DeleteIcon,
	EditCircleIcon,
	Github,
	GoToLinkIcon,
} from "../../data/icon";
import { Link } from "react-router-dom";
import { HoverAccentColor } from "../../components";
import { useLocation } from "react-router-dom";

const ProjectCard = ({
	project,
	handleEditProject,
	handleDeleteProject,
	background,
}) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const isLocation = location.pathname === "/user/profile";

	return (
		<div
			onMouseLeave={() => setIsOpen(false)}
			style={{
				backgroundColor: background,
			}}
			className={`${userPreferences.border} lg:w-[340px] xs:w-[320px] w-full ${
				!isOpen && "h-[350px]"
			}  flex flex-col gap-4 justify-between px-6 pt-6 pb-10`}
		>
			<div>
				<div className='flex justify-between items-center'>
					{isLocation && (
						<div className='flex items-center justify-center gap-4 mb-4'>
							<button
								onClick={() => handleEditProject(project)}
								className='cursor pointer'
								target='_blank'
							>
								<HoverAccentColor>
									<EditCircleIcon className='w-5 h-5' />
								</HoverAccentColor>
							</button>
							<button
								onClick={() => handleDeleteProject(project)}
								className='cursor pointer'
								target='_blank'
							>
								<HoverAccentColor>
									<DeleteIcon className='w-5 h-5' />
								</HoverAccentColor>
							</button>
						</div>
					)}

					<div className='flex justify-end items-center gap-4 mb-4 '>
						<Link to={project.link} className='cursor pointer' target='_blank'>
							<HoverAccentColor>
								<GoToLinkIcon className='w-5 h-5' />
							</HoverAccentColor>
						</Link>{" "}
						<Link
							to={project.sourceCode}
							className='cursor pointer'
							target='_blank'
						>
							<HoverAccentColor>
								<Github className='w-5 h-5' />
							</HoverAccentColor>
						</Link>{" "}
					</div>
				</div>

				<div>
					<h1 className='text-lg lg:text-xl whitespace-normal my-3 capitalize'>
						{project.title}
					</h1>
					<p
						onClick={() => setIsOpen(!isOpen)}
						style={{
							color: userPreferences.shade.text.secondaryText,
						}}
						className={`text-sm whitespace-normal ${
							!isOpen && "line-clamp-4 truncate"
						} leading-7 cursor-pointer`}
					>
						{project.description}
					</p>
				</div>
			</div>
			<div className='flex gap-2 flex-wrap text-xs lg:text-sm mt-3'>
				{project.techStack.map((tech, index) => (
					<span
						style={{
							color: userPreferences.color,
						}}
						key={tech + index}
						className='capitalize'
					>
						{tech}
					</span>
				))}
			</div>
		</div>
	);
};

export default ProjectCard;
