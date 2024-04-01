import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SignInContext } from "../context";
import { AiOutlineMail } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { devvieboard } from "../assets";
import MailSent from "./MailSent";

const ForgotPasswordForm = () => {
	const {
		error,
		email,
		isSubmitting,
		handleForgotPassword,
		setEmail,
		resetPasswordEmailSent,
		setResetPasswordEmailSent,
		setError,
	} = useContext(SignInContext);
	const navigate = useNavigate();

	const handleEmailChange = (newEmail) => {
		setEmail(newEmail);
		setError("");
	};

	const handleCancel = () => {
		setResetPasswordEmailSent(false);
		navigate("/signin");
	};

	const location = useLocation();

	// clear Errors
	useEffect(() => {
		setEmail("");
	}, [location]);

	return (
		<div className='w-full py-10 md:pt-20 sm:px-6 px-3 flex flex-col justify-between items-center gap-8 '>
			{resetPasswordEmailSent ? (
				<MailSent
					handleCancel={handleCancel}
					email={email}
					setResetPasswordEmailSent={setResetPasswordEmailSent}
				/>
			) : (
				<div className='flex justify-center items-center flex-col gap-8 md:gap-10 w-full'>
					<div className=' flex justify-center items-center flex-col'>
						<div className=' mb-6'>
							<img src={devvieboard} width={50} height={50} alt='logo' />
						</div>
						<div>
							<h1 className='font-DMSans text-3xl sm:text-4xl font-[800] tracking-tight text-center mb-3'>
								Forgot Password?
							</h1>
							<p className='text-sm text-gray-400 font-DMSans font-[500] text-center max-w-[300px] whitespace-normal'>
								{
									"Enter the email address associated with your account to get password reset link"
								}
							</p>
						</div>
					</div>

					<form
						onSubmit={handleForgotPassword}
						className='flex flex-col justify-between gap-6 w-full'
					>
						<div>
							<label
								htmlFor='email'
								className='relative flex justify-left items-center w-full'
							>
								<input
									type='email'
									placeholder='Enter your email here'
									name='email'
									required
									value={email}
									onChange={(e) => handleEmailChange(e.target.value)}
									className='w-full py-3 pl-11 font-DMSans outline-none border-[1.5px] border-gray-300 text-sm ss:text-base rounded-md glow-input'
								/>
								<AiOutlineMail className='absolute ml-4 text-gray-400 text-xl' />
							</label>
							{error && (
								<div className='text-red-500 font-DMSans text-sm font-bold mt-2'>
									{error}
								</div>
							)}
						</div>
						<button
							type='submit'
							className='bg-landingPrimary h-12 w-full button-hover rounded-md text-base font-DMSans font-[600] text-white cursor-pointer flex justify-center items-center'
						>
							{isSubmitting ? (
								<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
							) : (
								"Send reset link"
							)}
						</button>
						<Link
							to={"/signin"}
							className='h-12 border border-gray-500 w-full rounded-md text-base font-DMSans font-[600] text-black hover:text-white hover:bg-black transition-colors duration-200 ease-in-out cursor-pointer flex justify-center items-center'
						>
							<BsArrowLeft className='mr-2' /> Back to Login
						</Link>
					</form>
					<div className='text-gray-400 font-DMSans font-[500] text-sm text-center mt-5'>
						New to Devvie?{" "}
						<Link
							to={"/signup"}
							className='font-bold text-black hover:text-blue'
						>
							Create an account
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForgotPasswordForm;
