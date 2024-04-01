import { useContext } from "react";
import {
	ToastContext,
	UserPreferencesContext,
	UserProfileContext,
} from "../../context";
import { CameraIcon, CheckCircle } from "../../data/icon";
import { Link } from "react-router-dom";
import { backupAvatar } from "../../../assets";

const Header = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { userProfile, setUserProfile, handleFileUpload } =
		useContext(UserProfileContext);
	const { showToast } = useContext(ToastContext);

	const handleCheck = (key) => {
		if (userProfile.username.trim() !== "") {
			setUserProfile((prevData) => {
				const updatedProfile = {
					...prevData,
					[key]: !prevData[key],
				};

				return updatedProfile;
			});
		} else {
			showToast("warning", "Link is empty", "Enter your portfolio link slug");
			return;
		}
	};

	return (
		<div className='w-full h-full flex flex-col items-center gap-6'>
			<div className='relative w-full'>
				{userProfile.coverPhoto === null ? (
					<div
						style={{
							backgroundColor: userPreferences.shade.background,
							borderColor: userPreferences.shade.other,
						}}
						className={`${userPreferences.border} w-full md:h-[200px] h-[150px] border-2 border-dashed`}
					></div>
				) : (
					<div className={`${userPreferences.border} overflow-hidden `}>
						<img
							src={userProfile.coverPhoto}
							className='w-full md:h-[200px] h-[150px] object-cover'
						/>
					</div>
				)}

				<div className='absolute sm:top-[70%] right-4 top-4'>
					<div
						style={{
							backgroundColor: userPreferences.color,
							color: userPreferences.isLightMode ? "white" : "black",
						}}
						className={`${userPreferences.border} py-2 px-3 cursor-pointer hover:scale-110 transition-all duration-150 ease`}
					>
						<label
							htmlFor='coverPhotoInput'
							className='cursor pointer flex gap-1 text-xs md:text-sm justify-center items-center'
						>
							<CameraIcon className='md:w-5 md:h-5 h-4 w-4 cursor-pointer' />
							Upload Cover
						</label>
						<input
							id='coverPhotoInput'
							name='coverPhoto'
							onChange={(e) => handleFileUpload(e, "coverPhoto")}
							type='file'
							className='hidden'
							accept='image/*'
						/>
					</div>
				</div>
			</div>

			<div className='flex justify-center gap-7 items-end relative w-full'>
				<div className='-mt-24 relative'>
					<div className='rounded-full overflow-hidden '>
						<img
							src={userProfile?.userPhoto || backupAvatar}
							className={`${
								backupAvatar && "object-cover bg-white"
							}  md:w-[140px] md:h-[140px] w-[90px] h-[90px] object-contain`}
						/>
					</div>
					<div
						style={{
							backgroundColor: userPreferences.color,
							borderColor: userPreferences.shade.background,
						}}
						className={`rounded-full md:p-2 p-1 cursor-pointer absolute right-0 top-[70%] md:border-[3px] border hover:scale-110 transition-all duration-150 ease`}
					>
						<label
							htmlFor='userPhotoInput'
							className='cursor pointer flex gap-1 text-sm justify-center items-center'
						>
							<CameraIcon
								style={{
									color: userPreferences.isLightMode ? "white" : "black",
								}}
								className='md:w-5 md:h-5 h-4 w-4 cursor-pointer'
							/>
						</label>
						<input
							id='userPhotoInput'
							type='file'
							className='hidden'
							accept='image/*'
							name='userPhoto'
							onChange={(e) => handleFileUpload(e, "userPhoto")}
						/>
					</div>
				</div>

				<div className='absolute left-1/2 transform -translate-x-1/2 lg:transform-none lg:right-0 lg:left-auto top-4 md:top-16 lg:top-0 lg:pr-4 '>
					<div className='flex justify-between gap-6'>
						<button
							onClick={() => handleCheck("isPublished")}
							style={{
								backgroundColor: userPreferences.color,
								color: userPreferences.isLightMode ? "white" : "black",
							}}
							className={`${userPreferences.border} py-1 md:py-2 px-2 md:px-4 text-xs md:text-sm  hover:scale-110 transition-all duration-150 ease inline-block cursor-pointer`}
							type='button'
						>
							{userProfile?.isPublished ? "Unpublish" : "Publish"}
						</button>

						<Link
							to={`/${userProfile?.username}`}
							target='_blank'
							style={{
								backgroundColor: userPreferences.color,
								color: userPreferences.isLightMode ? "white" : "black",
							}}
							className={`${userPreferences.border} py-1 md:py-2 px-2 md:px-4 text-xs md:text-sm  hover:scale-110 transition-all duration-150 ease inline-block cursor-pointer`}
							type='button'
						>
							Preview
						</Link>
					</div>
				</div>
			</div>

			<div className='flex gap-4 md:gap-8 justify-center items-center flex-wrap mt-10 lg:mt-0 md:mt-14'>
				<div className='flex justify-center items-center gap-3'>
					<div
						style={{
							backgroundColor: userPreferences.color,
							color: userPreferences.isLightMode ? "white" : "black",
						}}
						className={`${userPreferences.border} py-1 md:py-2 px-2 md:px-4 text-xs md:text-sm`}
					>
						Hire me
					</div>
					<label className='cursor pointer flex justify-center items-center relative'>
						<input
							type='checkbox'
							className='w-5 h-5 bg-transparent opacity-0'
							checked={userProfile.hireMe}
							onChange={() => handleCheck("hireMe")}
						/>
						{userProfile.hireMe ? (
							<CheckCircle className='w-5 md:w-8 h-5 md:h-8 absolute cursor-pointer' />
						) : (
							<div
								style={{ borderColor: userPreferences.shade.text.primaryText }}
								className='w-4 md:w-7 h-4 md:h-7 rounded-full border-2 absolute cursor-pointer'
							></div>
						)}
					</label>
				</div>

				<div className='flex justify-center items-center gap-3'>
					<div
						style={{
							backgroundColor: userPreferences.color,
							color: userPreferences.isLightMode ? "white" : "black",
						}}
						className={`${userPreferences.border} py-1 md:py-2 px-2 md:px-4 text-xs md:text-sm `}
					>
						Remotely
					</div>
					<label className='cursor pointer flex justify-center items-center relative'>
						<input
							style={{ backgroundColor: userPreferences.color }}
							type='checkbox'
							className='w-5 h-5 bg-transparent opacity-0 '
							checked={userProfile.remotely}
							onChange={() => handleCheck("remotely")}
						/>
						{userProfile.remotely ? (
							<CheckCircle className='w-5 md:w-8 h-5 md:h-8 absolute cursor-pointer' />
						) : (
							<div
								style={{ borderColor: userPreferences.shade.text.primaryText }}
								className='w-4 md:w-7 h-4 md:h-7 rounded-full border-2 absolute cursor-pointer'
							></div>
						)}
					</label>
				</div>
			</div>
		</div>
	);
};

export default Header;
