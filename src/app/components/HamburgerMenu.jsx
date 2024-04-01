import { AppContext, UserPreferencesContext } from "../context";
import { useContext } from "react";

const HamburgerMenu = () => {
	const { setIsMenuOpen, isMenuOpen } = useContext(AppContext);
	const {userPreferences} = useContext(UserPreferencesContext)

	return (
		<button
			style={{"--bg-color": userPreferences.shade.text.primaryText}}
			onClick={() => setIsMenuOpen((prev) => !prev)}
			className={`${isMenuOpen ? "active" : ""} hamburger-menu`}
		>
			<div className='bar'></div>
			<div className='bar'></div>
			<div className='bar'></div>
		</button>
	);
};

export default HamburgerMenu;
