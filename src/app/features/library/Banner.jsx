import { useContext } from "react";
import {
	DashboardContext,
	UserPreferencesContext,
	UserProfileContext,
} from "../../context";
import { libraryImg } from "../../../assets";

const Banner = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { userProfile } = useContext(UserProfileContext);
	const { firstName } = useContext(DashboardContext);

	return (
		<div
			className={`${userPreferences.border}  h-full relative overflow-hidden`}
		>
			<div
				style={{ backgroundColor: userPreferences.color }}
				className={`${userPreferences.border} h-[190px] mt-12 flex justify-between items-center px-6 lg:px-20 relative `}
			>
				<div
					style={{ color: userPreferences.isLightMode ? "white" : "black" }}
					className='flex flex-col justify-center items-start'
				>
					<h1 className='lg:text-5xl mb-2 font-semibold text-2xl capitalize'>
						Hello {userProfile.firstName || firstName},
					</h1>
					<p className='text-xl font-semibold'>Welcome to Devmark!</p>
					<p className='text-sm lg:text-base max-w-[250px]  lg:max-w-full whitespace-normal'>
						Devmark helps you save important links
					</p>
				</div>

				<div className='overflow-hidden hidden sm:flex '>
					<img
						src={libraryImg}
						className='h-[250px] w-auto absolute right-0 bottom-0'
					/>
				</div>
			</div>
		</div>
	);
};

export default Banner;
