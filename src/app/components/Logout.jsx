import { useContext } from "react";
import { noFiles2 } from "../../assets";
import { UserPreferencesContext } from "../context";
import { AuthContext } from "../../context";

const Logout = ({ setWantToLogout, wantToLogout }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { signOutUser } = useContext(AuthContext);

	const signOut = () => {
		setWantToLogout(false);
		signOutUser();
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
				className={`${userPreferences.border}  mx-6 w-full xs:w-[350px] ss:h-[480px] h-[420px]  md:px-10 px-8 pb-8 flex flex-col justify-center items-center`}
			>
				<div>
					<img
						src={noFiles2}
						alt='Logout image'
						className='md:w-[240px] md:h-[240px] object-cover w-[200px] h-[200px]'
					/>
				</div>
				<div className='flex flex-col gap-3 w-full'>
					<h1 className='text-center md:text-2xl text-xl mb-2'>
						Oh No! You{"'"}re leaving... <br /> Are you sure?
					</h1>
					<button
						onClick={() => setWantToLogout(!wantToLogout)}
						style={{
							backgroundColor: userPreferences.color,
							color: userPreferences.isLightMode ? "white" : "black",
						}}
						className={`${userPreferences.border} text-base p-3 w-full hover:opacity-50 transition-opacity duration-200 ease-in-out `}
					>
						Naah, just kidding
					</button>
					<button
						onClick={signOut}
						style={{ borderColor: userPreferences.color }}
						className={`${userPreferences.border} text-base p-3 w-full border hover:opacity-50 transition-opacity duration-200 ease-in-out`}
					>
						Yes, log me out
					</button>
				</div>
			</div>
		</div>
	);
};

export default Logout;
