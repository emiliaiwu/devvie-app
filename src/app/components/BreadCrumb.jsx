import { NavLink, useLocation } from "react-router-dom";
import { UserPreferencesContext } from "../context";
import { useContext } from "react";

function BreadCrumb() {
	const { userPreferences } = useContext(UserPreferencesContext);

	const location = useLocation();
	const currentPath = location.pathname;
	let currentLink = "";

	const crumbs = currentPath
		.split("/")
		.filter((crumb) => crumb !== "")
		.map((crumb, index) => {
			const cleanedCrumb = crumb.replace(/[^a-zA-Z ]/g, "");
			currentLink += `/${crumb}`;
			if (index === 0) {
				return;
			}
			return (
				<div
					key={index}
					className='crumb cursor-pointer hover:text-[--hover-color] mr-3'
				>
					<NavLink to={currentLink} className='capitalize text-base'>
						{cleanedCrumb}
					</NavLink>
				</div>
			);
		});

	return (
		<nav
			style={{
				fontFamily: userPreferences.font.fontFamily,
				color: userPreferences.shade.text.primaryText,
				"--hover-color": userPreferences.color,
			}}
			aria-label='breadcrumbs'
			className='flex justify-between items-center text-base'
		>
			{crumbs}
		</nav>
	);
}
export default BreadCrumb;
