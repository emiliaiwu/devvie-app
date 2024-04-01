import { UserPreferencesContext } from "../context";
import { useContext } from "react";

const HoverAccentColor = ({ children, className }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	return (
		<div style={{ "--hover-color": userPreferences.color }}>
			<div className={`${className} hover:text-[--hover-color] transition-colors duration-100 ease`}>
				{children}
			</div>
		</div>
	);
};

export default HoverAccentColor;
