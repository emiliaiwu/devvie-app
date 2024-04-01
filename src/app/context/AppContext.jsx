import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<AppContext.Provider
			value={{
				isSidebarOpen,
				setIsSidebarOpen,
				isMobile,
				isMenuOpen,
				setIsMenuOpen,
				
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
