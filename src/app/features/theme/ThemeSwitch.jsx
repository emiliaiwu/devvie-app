import { UserPreferencesContext } from "../../context";
import { LightIcon, DarkIcon } from "../../data/icon";
import ThemeContext from "./ThemeContext";
import { useContext } from "react";

const ThemeSwitch = () => {
	const { toggleMode } = useContext(ThemeContext);
	const { userPreferences } = useContext(UserPreferencesContext);

    return (
			<div
				style={{
					color: userPreferences.shade.text.primaryText,
					"--bg-color": userPreferences.shade.other,
					"--hover-color": userPreferences.color,
				}}
			>
				<div
					onClick={toggleMode}
					className='hover-bg cursor-pointer md:w-9 md:h-9 flex justify-center items-center rounded-full transition-all duration-200 ease'
				>
					{userPreferences.isLightMode ? (
						<LightIcon className='w-6 h-6 ' />
					) : (
						<DarkIcon className='w-6 h-6 ' />
					)}
				</div>
			</div>
		);
};

export default ThemeSwitch;
