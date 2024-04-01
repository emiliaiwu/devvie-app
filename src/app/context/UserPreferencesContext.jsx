import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context";
import { ref, set, onValue, get } from "firebase/database";
import { database } from "../../firebase";
import {
	borderRadiusOptions,
	lightAccentColors,
	darkAccentColors,
	fontOptions,
	darkShades,
} from "../features/theme/themeData";

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
	const { user, setLoading, loading } = useContext(AuthContext);
	const [isHovered, setIsHovered] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [isReseting, setIsReseting] = useState(false);
	const [selectedLightShade, setSelectedLightShade] = useState("DayScript");
	const [selectedDarkShade, setSelectedDarkShade] = useState("DarkCoder");
	const [isLightMode, setIsLightMode] = useState(false);
	const [mode, setMode] = useState(isLightMode ? "light" : "dark");
	useEffect(() => {
		setMode(isLightMode ? "light" : "dark");
	}, [isLightMode]);

	const selectedShade = {
		...darkShades.DarkCoder,
		name: "DarkCoder",
	};

	const selectedBorder = borderRadiusOptions[5].style;
	const selectedFont = fontOptions[0];
	const fontNames = fontOptions.map((font) => font.split(",")[0]);
	const fontName = fontNames[0];

	const [accentColors, setAccentColors] = useState(
		isLightMode ? lightAccentColors : darkAccentColors
	);

	const defaultUserPreferences = {
		color: accentColors[0],
		border: selectedBorder,
		mode: mode,
		isLightMode: isLightMode,
		shade: selectedShade,
		font: {
			fontFamily: selectedFont,
			fontName: fontName,
		},
	};

	const [userPreferences, setUserPreferences] = useState(
		defaultUserPreferences
	);

	const [newUserPreferences, setNewUserPreferences] = useState(null);

	// update userPreferences
	const updateUserPreferences = async (newPreferences, shouldSave = null) => {
		setIsUpdated(false);

		if (user) {
			const userPreferencesRef = ref(database, `userPreferences/${user.uid}`);
			try {
				if (shouldSave) {
					setIsUpdating(true);
				}

				await set(userPreferencesRef, newPreferences);
				setIsUpdating(false);

				if (shouldSave) {
					setIsUpdated(true);
				}
			} catch (error) {
				console.error("Error updating user preferences:", error);
				setIsUpdating(false);
				setIsUpdated(false);
			}
		}
	};

	// update
	useEffect(() => {
		if (user) {
			const userPreferencesRef = ref(database, `userPreferences/${user.uid}`);

			const fetchData = async () => {
				setLoading(true);

				try {
					const snapshot = await get(userPreferencesRef);
					if (snapshot.exists()) {
						const preferences = snapshot.val();
						setUserPreferences(preferences);
						setNewUserPreferences(preferences);
						setIsLightMode(preferences.isLightMode);
						setLoading(false);
					} else {
						// If preferences don't exist, set default preferences
						setUserPreferences(defaultUserPreferences);
						setNewUserPreferences(defaultUserPreferences);
						await updateUserPreferences(defaultUserPreferences);
						setLoading(false);
					}
				} catch (error) {
					console.error("Error fetching user preferences:", error);
					setLoading(false);
				}
			};

			fetchData();

			const unsubscribe = onValue(userPreferencesRef, (snapshot) => {
				if (snapshot.exists()) {
					const preferences = snapshot.val();
					setUserPreferences(preferences);
				}
			});

			return () => {
				unsubscribe();
			};
		}
	}, [user]);

	// handle reset
	const handleResetPreferences = () => {
		setIsReseting(true);
		updateUserPreferences(defaultUserPreferences, false);
		setNewUserPreferences(defaultUserPreferences);
		setIsReseting(false);
	};

	// handle cancel
	const handleCancelPreferences = () => {
		updateUserPreferences(userPreferences);
		setNewUserPreferences(userPreferences);
	};

	// handle save
	const handleSavePreferences = () => {
		updateUserPreferences(newUserPreferences, true);
	};

	// Hover
	const color = userPreferences.color;
	const hoverColor = `bg-[${color}]`;

	return (
		<UserPreferencesContext.Provider
			value={{
				userPreferences,
				setUserPreferences,
				updateUserPreferences,
				selectedDarkShade,
				selectedLightShade,
				selectedShade,
				setSelectedDarkShade,
				setSelectedLightShade,
				mode,
				setMode,
				fontNames,
				handleResetPreferences,
				handleCancelPreferences,
				handleSavePreferences,
				setNewUserPreferences,
				newUserPreferences,
				isHovered,
				setIsHovered,
				loading,
				setLoading,
				isUpdating,
				setIsUpdating,
				isUpdated,
				setIsUpdated,
				isReseting,
				setIsReseting,
				hoverColor,
				isLightMode,
				setIsLightMode,
				setAccentColors,
				accentColors,
			}}
		>
			{children}
		</UserPreferencesContext.Provider>
	);
};

export default UserPreferencesContext;
