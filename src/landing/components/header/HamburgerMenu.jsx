import { useContext } from "react";
import { MobileMenuContext } from "../../context";

const HamburgerMenu = () => {
	const { toggleMobileMenu, isMobileMenuOpen } = useContext(MobileMenuContext);

	return (
		<button
			className={`${isMobileMenuOpen ? "active" : ""} hamburger-menu z-50`}
			onClick={toggleMobileMenu}
		>
			
			<div className='bar bg-black'></div>
			<div className='bar'></div>
		</button>
	);
};

export default HamburgerMenu;
