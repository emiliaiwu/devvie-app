import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const Button = ({ url, text, className }) => {
	return (
		<Link
			to={url}
			className={`px-5 py-[6px] md:py-[10px] text-white lg:py-[12px] rounded-full ${className} text-sm font-DMSans font-[600] md:text-base text-center hover:translate-y-[-5px] transition-all duration-200 ease-in-out`}
		>
			{text}
		</Link>
	);
};

export const PlayButton = () => {
	return (
		<button className='circle3 rounded-full flex justify-center items-center bg-landingPrimary shadow-2xl'>
			<FaPlay size={30} className="text-white" />
		</button>
	);
};

export const ButtonBig = ({ url, text, className }) => {
	return (
		<Link
			to={url}
			className={`px-5 py-4 rounded-full ${className} text-base font-DMSans font-[600] md:text-base text-center hover:translate-y-[-5px] transition-all duration-200 ease-in-out`}
		>
			{text}
		</Link>
	);
};

export default Button;
