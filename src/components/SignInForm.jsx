import { useContext, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { SignInContext } from "../context";
import { devvieboard } from "../assets";

const SignInForm = () => {
	const {
		email,
		password,
		setPassword,
		setEmail,
		handleSignIn,
		rememberMe,
		setRememberMe,
		isPasswordVisible,
		setIsPasswordVisible,
		emailErr,
		passwordErr,
		handleEmailChange,
		handlePasswordChange,
		isSubmitting,
		handleGoogleSignIn,
		setEmailErr,
		setPasswordErr,
		setError,
		handleGithubSignIn,
	} = useContext(SignInContext);

	const navigate = useNavigate();
	const location = useLocation();

	// clear Errors
	useEffect(() => {
		setEmail("");
		setPassword("");
		setEmailErr("");
		setPasswordErr("");
		setError("");
		setIsPasswordVisible(false);
	}, [location]);

	return (
		<div className='w-full py-10 md:pt-20 px-3 sm:px-6 flex flex-col justify-between items-left gap-8  h-full '>
			<div className=' flex justify-center items-center flex-col'>
				<Link to={"/"} className=' mb-6'>
					<img src={devvieboard} width={50} height={50} alt='logo' />
				</Link>
				<h1 className='font-DMSans text-2xl lg:text-[42px]  sm:text-4xl font-[800] mb-1 text-center'>
					Hello Again!
				</h1>
				<p className='text-sm text-gray-400 font-DMSans font-[500] text-center'>
					sign in to your account
				</p>
			</div>
			<div className='w-full flex justify-between gap-4'>
				<button
					onClick={(e) => handleGoogleSignIn(e, navigate)}
					className='w-1/2 border-[1.5px]   border-gray-300 py-3 rounded-md flex justify-center items-center font-DMSans font-[800] text-base glow-input cursor-pointer'
				>
					<FcGoogle size={25} className='mr-2' />{" "}
					<span className='hidden sm:inline-block'>Google</span>
				</button>
				<button
					onClick={(e) => handleGithubSignIn(e, navigate)}
					className='w-1/2 border-[1.5px]  border-gray-300 py-3 rounded-md flex justify-center items-center font-DMSans font-[800] text-base glow-input cursor-pointer'
				>
					<FaGithub size={25} className='mr-2' />{" "}
					<span className='hidden sm:inline-block'>Github</span>
				</button>
			</div>

			{/* continue with */}
			<div className='w-full flex justify-center items-center relative'>
				<div className='w-full h-[1px] bg-gray-300 '></div>
				<span className='absolute text-sm font-DMSans text-gray-400 px-4 bg-white'>
					Or continue with
				</span>
			</div>

			{/* form */}
			<form
				className='flex flex-col gap-3'
				onSubmit={(e) => handleSignIn(e, navigate)}
			>
				<div>
					<label
						htmlFor='email'
						className='relative flex justify-left items-center w-full'
					>
						<input
							type='email'
							placeholder='Enter your email'
							name='email'
							value={email}
							required
							onChange={(e) => handleEmailChange(e.target.value)}
							className={`${
								emailErr ? "border-red-500" : "border-gray-300"
							} w-full py-3 pl-11 pr-10 font-DMSans outline-none border-[1.5px] border-gray-300 text-sm ss:text-base rounded-md glow-input`}
						/>
						<AiOutlineMail className='absolute ml-4 text-gray-400 text-xl' />
					</label>
					{emailErr && (
						<p className='text-red-500 font-DMSans text-sm font-bold pt-2'>
							{emailErr}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor='password'
						className='relative flex justify-left items-center w-full mb-2'
					>
						<input
							type={isPasswordVisible ? "text" : "password"}
							required
							placeholder='Enter your password'
							onChange={(e) => handlePasswordChange(e.target.value)}
							className={`${
								passwordErr ? "border-red-500" : "border-gray-300"
							} w-full py-3 pl-11 pr-10 font-DMSans outline-none border-[1.5px] border-gray-300 text-sm ss:text-base rounded-md glow-input`}
						/>
						<AiOutlineLock className='absolute ml-4 text-gray-400 text-xl' />
						<button
							type='button'
							onClick={() => setIsPasswordVisible(!isPasswordVisible)}
							className='absolute right-0 mr-4 text-gray-400 text-lg outline-none'
						>
							{!isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
						</button>
					</label>
					{passwordErr && (
						<p className='text-red-500 font-DMSans text-sm font-bold mt-2'>
							{passwordErr}
						</p>
					)}
				</div>

				<div className='mt-5'>
					<div className='flex items-center justify-between text-sm font-DMSans font-semibold text-black mb-6'>
						<label className='flex'>
							<input
								type='checkbox'
								checked={rememberMe}
								onChange={() => setRememberMe((prev) => !prev)}
								className='mr-2 cursor-pointer accent-black'
							/>{" "}
							Remember Me
						</label>

						<div>
							<Link
								to={"/forgot-password"}
								className='text-black cursor-pointer border-b border-black hover:text-blue hover:border-blue transition-colors duration-200 ease'
							>
								Forgot Password?
							</Link>
						</div>
					</div>

					{/* SUBMIT BUTTON */}
					<button
						type='submit'
						// disabled={!(email && password)}
						className={`${
							email && password
								? "bg-landingPrimary opacity-100"
								: "bg-landingPrimary opacity-50"
						} h-12 button-hover w-full rounded-md text-base font-DMSans font-[600] text-white hover:bg-black transition-all duration-200 ease cursor-pointer flex justify-center items-center`}
					>
						{isSubmitting ? (
							<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
						) : (
							"Login"
						)}
					</button>
				</div>
			</form>

			{/* GOOGLE AND GITHUB */}

			<div className='text-gray-400 font-DMSans text-sm text-center mt-5 md:mt-10'>
				{"Don't have an account?"}{" "}
				<Link to={"/signup"} className='font-bold text-black hover:text-blue'>
					Sign up
				</Link>
			</div>
		</div>
	);
};

export default SignInForm;
