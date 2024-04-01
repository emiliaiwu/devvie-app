import { ClipLoader } from "react-spinners";
import { SignInContext, AuthContext } from "../context";
import { useContext, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { authErrors } from "../firebase";
import { devvieboard } from "../assets";
import PasswordResetDone from "./PasswordResetDone";
import InvalidLink from "./InvalidLink";

const ResetPasswordForm = ({ query, isActionCodeValid }) => {
	const {
		isSubmitting,
		isPasswordVisible,
		setIsPasswordVisible,
		setIsSubmitting,
	} = useContext(SignInContext);

	const { resetPassword } = useContext(AuthContext);
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [confirmError, setConfirmError] = useState("");
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [error, setError] = useState("");
	const [passwordChanged, setPasswordChanged] = useState(false);

	const handlePasswordChange = (e) => {
		setNewPassword(e.target.value);
		setError("");
		setConfirmError("");
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmNewPassword(e.target.value);
		setError("");
		setConfirmError("");
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError("");
		setConfirmError("");
		setIsSubmitting(true);
		setPasswordChanged(false);
		setIsPasswordVisible(false);
		setIsConfirmPasswordVisible(false);

		// Your password validation regex pattern
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (!passwordRegex.test(newPassword)) {
			setError(
				"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
			);
			setIsSubmitting(false);
			return;
		}

		if (newPassword !== confirmNewPassword) {
			setConfirmError("Passwords don't match");
			setError("Passwords don't match");
			setIsSubmitting(false);
		} else {
			try {
				await resetPassword(query.get("oobCode"), newPassword);
				setPasswordChanged(true);
			} catch (err) {
				const errorCode = err.code;
				const errorMessage = authErrors[errorCode];
				setError(errorMessage);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return (
		<div className='w-full pt-10 sm:pt-14 pb-12 sm:px-6  px-3 flex flex-col justify-between items-center '>
			{passwordChanged && <PasswordResetDone />}
			{!isActionCodeValid && <InvalidLink />}
			{isActionCodeValid && !passwordChanged && (
				<div className='flex justify-center items-center flex-col gap-8 w-full'>
					<div>
						<img src={devvieboard} width={50} height={50} alt='logo' />
					</div>
					<div className=''>
						<h1 className='font-DMSans text-3xl sm:text-4xl font-[800] tracking-tight mb-3 text-center'>
							Reset password
						</h1>
						<p className='text-sm text-gray-400 font-DMSans font-[500] text-center max-w-[300px]'>
							Your new password must be different from your previously used
							passwords.
						</p>
					</div>
					<form
						className='flex flex-col justify-between gap-6 w-full'
						onSubmit={handleResetPassword}
					>
						<div>
							<div className='mb-4'>
								<label
									htmlFor='password'
									className='relative flex justify-left items-center w-full mb-2'
								>
									<input
										type={isPasswordVisible ? "text" : "password"}
										value={newPassword}
										required
										placeholder='Enter 6+ strong characters'
										onChange={handlePasswordChange}
										className={`${
											error ? "border-red-500" : "border-gray-300"
										} w-full py-3 pl-11 pr-10 font-DMSans outline-none border-[1.5px] text-base rounded-md glow-input`}
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
								{error && (
									<p className='text-red-500 font-DMSans text-sm font-bold mt-2'>
										{error}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor='password'
									className='relative flex justify-left items-center w-full mb-2'
								>
									<input
										type={isConfirmPasswordVisible ? "text" : "password"}
										value={confirmNewPassword}
										required
										placeholder='Confirm password'
										onChange={handleConfirmPasswordChange}
										className={`${
											confirmError ? "border-red-500" : "border-gray-300"
										} w-full py-3 pl-11 pr-10 font-DMSans outline-none border-[1.5px] text-base rounded-md glow-input`}
									/>
									<AiOutlineLock className='absolute ml-4 text-gray-400 text-xl' />
									<button
										type='button'
										onClick={() =>
											setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
										}
										className='absolute right-0 mr-4 text-gray-400 text-lg outline-none'
									>
										{!isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
									</button>
								</label>
								{confirmError && (
									<p className='text-red-500 font-DMSans text-sm font-bold mt-2'>
										{confirmError}
									</p>
								)}
							</div>
						</div>
						{/* SUBMIT BUTTON */}
						<button
							type='submit'
							className='
					 h-12 w-full button-hover rounded-md text-base font-DMSans font-[600] bg-landingPrimary text-white hover:bg-black transition-all duration-200 ease cursor-pointer flex justify-center items-center'
						>
							{isSubmitting ? (
								<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
							) : (
								"Reset Password"
							)}
						</button>
					</form>
					<div className='max-w-[320px] text-sm text-gray-400 font-[500] font-DMSans text-center mt-5'>
						Remembered password?{" "}
						<Link
							to={"/signin"}
							className='font-[600] text-black cursor-pointer hover:border-b-[1.5px] hover:border-black '
						>
							Login
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ResetPasswordForm;
