import { createContext, useContext, useState, } from "react";
import {
	lightAccentColors,
	darkAccentColors,
	borderRadiusOptions,
	fontOptions,
} from "./themeData";
import { lightShades, darkShades } from "./themeData";
import { UserPreferencesContext } from "../../context";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const {
		userPreferences,
		selectedDarkShade,
		selectedLightShade,
		selectedShade,
		setSelectedDarkShade,
		setSelectedLightShade,
		mode,
		fontNames,
		setNewUserPreferences,
		newUserPreferences,
		loading,
		setLoading,
		isUpdating,
		isUpdated,
		setIsUpdated,
		hoverColor,
		updateUserPreferences,
		isLightMode,
		setIsLightMode,
		setAccentColors,
		accentColors,
	} = useContext(UserPreferencesContext);

	const lightShade = {
		...lightShades.DayScript,
		name: "DayScript",
	};

	const darkShade = {
		...darkShades.DarkCoder,
		name: "DarkCoder",
	};

	// theme

	// handle light shade
	const handleLightShade = (shadeName) => {
		setSelectedLightShade(shadeName);
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			shade: {
				...lightShades[shadeName],
				name: shadeName,
			},
		}));
		setIsUpdated(false);
	};

	// handle dark shade
	const handleDarkShade = (shadeName) => {
		setSelectedDarkShade(shadeName);
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			shade: {
				...darkShades[shadeName],
				name: shadeName,
			},
		}));
		setIsUpdated(false);
	};

	// toggle mode
	const toggleMode = () => {
		setLoading(true);
		const newIsLightMode = userPreferences.isLightMode ? false : true;
		setAccentColors(newIsLightMode ? lightAccentColors : darkAccentColors);
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			color: newIsLightMode ? lightAccentColors[0] : darkAccentColors[0],
			isLightMode: newIsLightMode,
			mode: newIsLightMode ? "light" : "dark",
			shade: newIsLightMode ? lightShade : darkShade,
		}));
		updateUserPreferences(
			{
				...userPreferences,
				color: newIsLightMode ? lightAccentColors[0] : darkAccentColors[0],
				isLightMode: newIsLightMode,
				mode: newIsLightMode ? "light" : "dark",
				shade: newIsLightMode ? lightShade : darkShade,
			},
			true
		);
		setLoading(false);
	};

	// light mode
	const handleLightMode = () => {
		setIsLightMode(true);
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			isLightMode: true,
			mode: "light",
			shade: lightShade,
		}));
		setIsUpdated(false);
		setAccentColors(lightAccentColors);
	};

	// dark mode
	const handleDarkMode = () => {
		setIsLightMode(false);
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			isLightMode: false,
			mode: "dark",
			shade: darkShade,
		}));
		setIsUpdated(false);
		setAccentColors(darkAccentColors);
	};

	// border
	const handleBorderClick = (borderStyle) => {
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			border: borderStyle,
		}));
		setIsUpdated(false);
	};

	// color
	const handleColorChange = (color) => {
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			color: color,
		}));
		setIsUpdated(false);
	};

	// font
	const [isOpen, setIsOpen] = useState(false);

	// font dropdown
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
		setIsUpdated(false);
	};

	const handleFontClick = (font, index) => {
		setIsOpen(false);
		setNewUserPreferences((prevUserPreferences) => ({
			...prevUserPreferences,
			font: { fontFamily: font, fontName: fontNames[index] },
		}));
		setIsUpdated(false);
	};

	return (
		<ThemeContext.Provider
			value={{
				isOpen,
				setIsOpen,
				isLightMode,
				setIsLightMode,
				handleColorChange,
				accentColors,
				borderRadiusOptions,
				handleBorderClick,
				handleFontClick,
				toggleDropdown,
				fontOptions,
				fontNames,
				toggleMode,
				mode,
				selectedShade,
				handleLightMode,
				handleDarkMode,
				selectedLightShade,
				selectedDarkShade,
				lightShades,
				darkShades,
				handleLightShade,
				handleDarkShade,
				userPreferences,
				newUserPreferences,
				loading,
				setLoading,
				isUpdating,
				isUpdated,
				setIsUpdated,
				hoverColor,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;
