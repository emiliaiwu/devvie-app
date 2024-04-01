import { useContext } from "react";
import {
	UserPreferencesContext,
} from "../../context";

const ProjectCard = ({ backgroundColor, icon, title, count, description }) => {
    const { userPreferences } = useContext(UserPreferencesContext);
	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className={`${userPreferences.border} h-[85px] md:h-28 w-full flex items-center px-6 gap-6`}
		>
			<div
				style={{ backgroundColor: backgroundColor }}
				className={`${userPreferences.border} p-2 h-12 md:h-16 w-12 md:w-16 flex justify-center items-center`}
			>
				{icon}
			</div>
			<div>
				<h2 className='text-2xl md:text-3xl font-semibold'>{count}</h2>
				<p className='text-sm md:text-base'>{description}</p>
			</div>
		</div>
	);
};

export default ProjectCard;
