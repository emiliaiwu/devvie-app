import { createContext, useState } from "react";

const MobileMenuContext = createContext();

export const MobileMenuProvider = ({ children }) => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen((prevState) => !prevState);
	};

	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
	};

	return (
		<MobileMenuContext.Provider
			value={{
				isMobileMenuOpen,
				toggleMobileMenu,
				closeMobileMenu,
			}}
		>
			{children}
		</MobileMenuContext.Provider>
	);
};

export default MobileMenuContext;
