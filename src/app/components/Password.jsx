import { useContext, useState } from "react";
import { UserPreferencesContext } from "../context";
import { passwordImg } from "../../assets";
import { AuthContext, UserContext } from "../../context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Password = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		handleProceedToDelete,
		myPassword,
		setMyPassword,
		setWantToChangePassword,
	} = useContext(AuthContext);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { setWantToDeleteAccount } = useContext(UserContext);

	const handleCancelDelete = () => {
		setWantToChangePassword(false);
		setWantToDeleteAccount(false);
		setMyPassword("");
	};

	return (
		<div
			className={`z-[1000] fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center overflow-y-auto`}
		>
			<div
				style={{
					backgroundColor: userPreferences.shade.card,
					fontFamily: userPreferences.font.fontFamily,
					color: userPreferences.shade.text.primaryText,
				}}
				className={`${userPreferences.border}  mx-6 w-full xs:w-[350px] ss:h-[480px] h-[420px] md:px-10 px-6 pb-4 flex flex-col justify-center items-center`}
			>
				<div>
					<img
						src={passwordImg}
						alt='Password image'
						className='md:w-[220px] md:h-[220px] object-cover w-[200px] h-[200px]'
					/>
				</div>

				<div className='flex flex-col gap-3 w-full'>
					<h1 className='text-center md:text-2xl text-xl whitespace-normal'>
						Your password is required!
					</h1>
					<label className='w-full flex flex-row justify-between items-center gap-2 mb-2 relative'>
						<input
							type={isPasswordVisible ? "text" : "password"}
							value={myPassword}
							onChange={(e) => setMyPassword(e.target.value)}
							placeholder='Enter password'
							style={{
								color: userPreferences.shade.text.primaryText,
								borderColor: userPreferences.shade.other,
							}}
							className={`${userPreferences.border} w-full bg-transparent text-sm md:text-base py-2 px-4 border-[1.5px] `}
						/>

						<button
							style={{
								color: userPreferences.shade.text.secondaryText,
							}}
							type='button'
							onClick={() => setIsPasswordVisible(!isPasswordVisible)}
							className='absolute right-0 mr-4 text-lg outline-none'
						>
							{!isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
						</button>
					</label>
					<div className='w-full flex flex-row gap-2 '>
						<button
							onClick={handleCancelDelete}
							style={{
								borderColor: userPreferences.color,
							}}
							className={`${userPreferences.border} w-full py-2 px-3 border hover:opacity-55`}
						>
							Cancel
						</button>{" "}
						<button
							onClick={handleProceedToDelete}
							style={{
								backgroundColor: userPreferences.color,
								color: userPreferences.isLightMode ? "white" : "black",
							}}
							className={`${userPreferences.border}  w-full text-sm md:text-base py-2 px-3 hover:opacity-55`}
						>
							Proceed
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Password;
