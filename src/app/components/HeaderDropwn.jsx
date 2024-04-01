import { useContext } from "react";
import { UserPreferencesContext, UserProfileContext } from "../context";
import { DeleteAccountIcon, LogoutIcon } from "../data/icon";
import HoverAccentColor from "./HoverAccentColor";
import UserContext from "../context/UserContext";

const HeaderDropwn = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { setWantToDeleteAccount, setWantToLogout } = useContext(UserContext);
	const { displayName, email, setOpenImage } = useContext(UserProfileContext);

	const handleLogout = () => {
		setWantToLogout(true);
		setOpenImage(false);
	};

	const handleDelete = () => {
		setWantToDeleteAccount(true);
		setOpenImage(false);
	};

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
				borderColor: userPreferences.shade.other,
				color: userPreferences.shade.text.primaryText,
			}}
			className={`${userPreferences.border}  absolute w-[200px] right-4 md:right-0 border top-12 pt-2`}
		>
			<div>
				<div
					style={{
						borderColor: userPreferences.shade.other,
					}}
					className='py-2 pb-4 border-b'
				>
					<h2
						style={{
							fontFamily: userPreferences.font.fontFamily,
							color: userPreferences.shade.text.primaryText,
						}}
						className='text-base font-semibold px-4 capitalize'
					>
						{displayName}
					</h2>
					<p className='text-xs px-4'>{email}</p>
				</div>
				<div className='flex flex-col gap-1 px-5 pt-3 pb-4'>
					<HoverAccentColor>
						<button
							onClick={handleLogout}
							className={`flex items-center justify-start w-full transition-all duration-200 ease text-sm gap-2 py-2`}
						>
							<div className={`flex justify-center items-center h-full `}>
								{<LogoutIcon className='w-5 h-5' />}
							</div>
							Logout
						</button>{" "}
					</HoverAccentColor>
					<HoverAccentColor>
						<button
							onClick={handleDelete}
							className={`  flex items-center justify-start w-full transition-all duration-200 ease text-sm gap-2 py-2`}
						>
							<div className={`flex justify-center items-center h-full `}>
								{<DeleteAccountIcon className='w-5 h-5' />}
							</div>
							Delete
						</button>
					</HoverAccentColor>
				</div>
			</div>
		</div>
	);
};

export default HeaderDropwn;
