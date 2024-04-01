import { menuLeftTop} from "../data/db";
import { AppContext } from "../context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserPreferencesContext } from "../context";

const MobileMenu = () => {
	const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<nav
			style={{ backgroundColor: userPreferences.shade.background }}
			className={`${
				isMenuOpen ? "left-0" : "left-[-100%]"
			}  h-screen fixed top-0 px-3 pb-2 flex flex-col lg:left-0 transition-all duration-200 ease w-[300px] lg:hidden z-[100]`}
		>
			<div
				style={{
					color: userPreferences.shade.text.primaryText,
					fontFamily: userPreferences.font.fontFamily,
				}}
				className='flex flex-col mt-6 py-6 justify-between pt-20'
			>
				<ul className='flex flex-col gap-1 mb-8'>
					{menuLeftTop.map((menu, index) => (
						<li
							onClick={() => setIsMenuOpen(false)}
							key={index}
							className='h-10 flex items-center relative group'
						>
							<Link to={menu.url} className='flex items-center h-full w-full'>
								<div className='flex justify-center items-center h-full min-w-[55px]'>
									{<menu.icon className='w-7 h-5' />}
								</div>

								<span className='menu-title text-base h-full flex items-center flex-1'>
									{menu.title}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default MobileMenu;
