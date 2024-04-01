import { useContext } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Button from "../Button";
import { MobileMenuContext } from "../../context";
import NavLinks from "./NavLinks";

const MobileMenu = () => {
	const { isMobileMenuOpen } = useContext(MobileMenuContext);

	return (
		<div
			style={{ "--bg-color": "black" }}
			className='lg:hidden flex items-center gap-4'
		>
			<Button
				url={"signin"}
				text={"Login"}
				className={" text-black bg-landingPrimary block z-50 md:hidden"}
			/>

			<HamburgerMenu />
			<nav
				className={`fixed w-full bg-white pt-12 px-6 flex flex-col justify-between pb-4 transition-all duration-500 ease border-b border-black -bottom-[100%] top-[60px] h-[180px]   ${
					isMobileMenuOpen ? "left-0" : "left-[-100%]"
				}`}
			>
				<ul className='flex flex-col gap-4 p-1'>
					<NavLinks className={"text-base inline"} />
				</ul>
			</nav>
		</div>
	);
};

export default MobileMenu;
