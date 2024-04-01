import { UserPreferencesContext } from "../../context";
import { useContext } from "react";
import { projectNavLinks } from "../../data/projectData";
import { NavLink } from "react-router-dom";
import { HoverAccentColor } from "../../components";

const ProjectNav = () => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div>
			<ul
				style={{ borderBottom: `1px solid ${userPreferences.shade.other}` }}
				className='flex gap-10 items-center pb-5'
			>
				{projectNavLinks.map((nav, index) => (
					<li key={index}>
						<NavLink
							className='text-sm pb-5 px-4 capitalize'
							style={({ isActive }) => ({
								fontFamily: userPreferences.font.fontFamily,
								"--hover-color": userPreferences.color,
								color: isActive
									? userPreferences.color
									: userPreferences.shade.text.secondaryText,
								borderBottom: `1px solid ${
									isActive
										? userPreferences.color
										: userPreferences.shade.background
									}`,
								
							})}
							to={nav.url}
						>
							{nav.nav}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProjectNav;
