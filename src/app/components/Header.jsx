import HamburgerMenu from "./HamburgerMenu";
import { useContext, useEffect, useState } from "react";
import {
	AppContext,
	UserPreferencesContext,
	UserProfileContext,
} from "../context";
import { ArrowRight, ThemeIcon } from "../data/icon";
import { ThemeSwitch } from "../features/theme";
import { Link, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import HeaderDropwn from "./HeaderDropwn";

const Header = () => {
	const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
	const { userPreferences } = useContext(UserPreferencesContext);
	const [isProjectLocation, setIsProjectLocation] = useState(false);
	const { openImage } = useContext(UserProfileContext);
	const location = useLocation();

	useEffect(() => {
		if (
			location.pathname === "/user/projects" ||
			location.pathname === "/user/tasks"
		) {
			setIsProjectLocation(true);
		} else {
			setIsProjectLocation(false);
		}
	}, [location]);

	return (
		<header
			style={{
				backgroundColor: userPreferences.shade.background,
				borderColor: userPreferences.shade.other,
			}}
			className={`${
				isSidebarOpen && isProjectLocation ? "lg:left-[304px]" : "lg:left-20"
			} h-[70px] px-3 md:h-20 md:px-5 lg:px-6 fixed top-0 right-0 left-0 z-[110] transition-all duration-500 ease flex items-center justify-center md:py-2 max-w-[100vw] border-b`}
		>
			<div className='flex justify-between items-center w-full'>
				{/* MENU */}
				<div className='lg:hidden'>
					<HamburgerMenu />
				</div>

				{/* COLLAPSE ARROW */}
				{isProjectLocation && (
					<div className='hidden lg:block bg-white rounded-full'>
						<ArrowRight
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							style={{ color: userPreferences.color }}
							className={`${
								isSidebarOpen ? "rotate-[360]" : "rotate-180"
							} cursor-pointer w-8 h-8 absolute -left-4 top-6 transition-all duration-200 ease `}
						/>
					</div>
				)}
				<div />

				<div
					style={{
						color: userPreferences.shade.text.primaryText,
						"--bg-color": userPreferences.shade.other,
						"--hover-color": userPreferences.color,
					}}
					className='flex items-center gap-4'
				>
					<ThemeSwitch />

					<div
						style={{ color: userPreferences.shade.text.primaryText }}
						className='md:w-9 md:h-9 rounded-full flex items-center justify-center lg:bg-[--bg-color]  cursor-pointer transition-all duration-200 ease'
					>
						<Link to={"/user/appearance"}>
							<ThemeIcon className='w-6 h-6 hover:text-[--hover-color]' />
						</Link>
					</div>

					<div
						style={{ borderLeft: `1px solid ${userPreferences.shade.other}` }}
						className='md:pl-3 md:ml-1 pl-2 relative'
					>
						<Avatar />
						{openImage && <HeaderDropwn />}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
