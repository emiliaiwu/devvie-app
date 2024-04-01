import { faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const InvalidLink = () => {
	return (
		<div className='flex justify-between items-center w-full flex-col gap-16 px-2 ss:px-10 lg:px-12 py-6'>
			<div className='flex flex-col justify-center items-center gap-8 w-full'>
				<div className='p-6 bg-offwhite rounded-3xl bg-opacity-50 inline-block'>
					<FontAwesomeIcon
						icon={faLinkSlash}
						className='text-[60px] text-black'
					/>
				</div>
				<div>
					<h1 className='font-Kanit text-3xl sm:text-4xl font-[600] tracking-tight text-center mb-3'>
						Invalid Link!
					</h1>
					<p className='text-sm text-gray-400 font-DMSans font-[500] text-center w-[300px]'>
						Link has been used, expired or is <br /> invalid. Please request a
						new link.
					</p>
				</div>

				<Link
					to={"/forgot-password"}
					className='button-hover w-full font-DMSans font-[500] bg-landingPrimary text-white py-3 rounded-md cursor-pointer text-center '
				>
					Send new reset link
				</Link>

				<div className='text-gray-400 font-DMSans text-sm text-center mt-3'>
					New account?{" "}
					<Link to={"/signup"} className='font-bold text-black hover:text-blue'>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default InvalidLink;
