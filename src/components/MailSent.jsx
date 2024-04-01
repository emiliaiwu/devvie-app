import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { useScrollToTop } from "../hooks";

const MailSent = ({ email, handleCancel, setResetPasswordEmailSent }) => {
	const openEmailClient = () => {
		window.location.href = `mailto:${email}`;
	};

	useScrollToTop();

	return (
		<div className='flex justify-between items-center w-full flex-col gap-10 px-2 ss:px-10 h-full'>
			<div className='flex flex-col justify-center items-center gap-8 w-full'>
				<div className='p-6 bg-offwhite rounded-3xl bg-opacity-50 inline-block'>
					<FontAwesomeIcon
						icon={faEnvelopeOpenText}
						className='text-[60px] text-black'
					/>
				</div>
				<div>
					<h1 className='font-DMSans text-3xl sm:text-4xl font-[800] tracking-tight text-center mb-3'>
						Check your mail!
					</h1>
					<p className='text-sm text-gray-400 font-DMSans font-[500] text-center w-[300px]'>
						We have sent the password <br /> reset instructions to your email.
					</p>
				</div>
				<div className='flex flex-col justify-center items-center gap-8 w-full'>
					{" "}
					<button
						onClick={openEmailClient}
						className='w-full button-hover font-DMSans font-[500] bg-landingPrimary text-white py-3 rounded-md cursor-pointer '
					>
						Open Email
					</button>
					
						<div
							onClick={handleCancel}
							className='text-black font-[600] border-white font-DMSans cursor-pointer border-b-[1.5px] hover:border-black  transition-all duration-200 linear'
						>
							{"I'll open it later"}
						</div>
					
				</div>
			</div>
			<div className='max-w-[300px] text-sm text-gray-400 font-DMSans text-center w-full'>
				{"Didn't receive the email? Check your spam folder, or "}{" "}
				<span
					className='font-[600] text-black cursor-pointer hover:border-b-[1.5px] hover:border-black '
					onClick={() => setResetPasswordEmailSent(false)}
				>
					Try another email address
				</span>
			</div>
		</div>
	);
};

export default MailSent;
