import { useContext } from "react";
import { UserProfileContext } from "../context";
import { backupAvatar } from "../../assets";
import { AuthContext } from "../../context";

const Avatar = () => {
	const { userProfile, openImage, setOpenImage } =
		useContext(UserProfileContext);
	const { user } = useContext(AuthContext);

	const userPhoto = userProfile?.userPhoto;
	const dpName = userProfile?.firstName + " " + userProfile?.lastName;
	const displayName = userProfile.length === 0 ? user?.displayName : dpName;

	return (
		<div className='flex items-center gap-2'>
			<div
				onClick={() => setOpenImage(!openImage)}
				className=' w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center hover-border transition-all duration-200 ease cursor-pointer'
			>
				<img
					src={userPhoto || backupAvatar}
					alt={displayName}
					className={`${
						backupAvatar && "bg-white object-cover"
					} w-full h-full rounded-full `}
				/>
			</div>
		</div>
	);
};

export default Avatar;
