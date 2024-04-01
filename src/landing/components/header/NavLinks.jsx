import { navLinks } from "../../data/db";
import { NavLink } from "react-router-dom";

const NavLinks = ({ className }) => {
	return (
		<>
			{navLinks.map((link, index) => (
				<li
					key={index}
					className=' text-black text-left cursor-pointer text-sm md:text-base font-[500] font-DMSans bg-transparent hover:text-landingPrimary transition-all duration-150 ease-in-out'
				>
					<NavLink to={link.url} className={`${className}`}>
						{link.label}
					</NavLink>
				</li>
			))}
		</>
	);
};

export default NavLinks;
