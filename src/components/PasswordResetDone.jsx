import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../hooks";

const PasswordResetDone = () => {
	useScrollToTop();

	return (
		<div className='flex justify-center items-center w-full flex-col gap-16 px-3 ss:px-6 md:px-8 lg:px-12 py-6'>
			<div className='flex flex-col justify-between items-center gap-10 w-full'>
				<div className='p-6 bg-offwhite rounded-3xl bg-opacity-50 inline-block'>
					<RiLockPasswordFill className='text-[60px] text-black' />
				</div>
				<div>
					<h1 className='font-DMSans text-3xl sm:text-4xl font-[800] tracking-tight text-center mb-3'>
						Well done!
					</h1>
					<p className='text-sm text-gray-400 font-DMSans font-[500] text-center max-w-[300px] w-full'>
						Your password has been changed successfully. Login to access your
						Devvie account. <br/> Happy Coding!
					</p>
				</div>
				<div className='flex justify-center items-center w-full'>
					<Link
						to={"/signin"}
						className='w-full button-hover font-DMSans font-[500] bg-landingPrimary text-white py-3 rounded-md cursor-pointer text-center'
					>
						Login to continue
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PasswordResetDone;
