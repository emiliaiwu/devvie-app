import { Link } from "react-router-dom";
import { devvieboard } from "../../assets/index";

const Logo = () => {
	return (
		<Link
			to={"/"}
			className='cursor-pointer hover:translate-y-[-5px] transition-all duration-200 ease-in-out z-50'
		>
			<div className='flex items-center gap-1'>
				<img src={devvieboard} alt='logo' className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]" />
				<h1
					className={`font-DMSans text-2xl md:text-3xl font-[700] ml-1 text-black tracking-tight`}
				>
					Devvie
				</h1>
			</div>
		</Link>
	);
};

export default Logo;
