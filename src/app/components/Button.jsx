import { useContext } from "react";
import { UserPreferencesContext } from "../context";

export const ColoredButton = ({ children, color, font, border, fontColor }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div
			style={{
				backgroundColor: color || userPreferences.color,
				color: fontColor,
			}}
			className={`${
				border || userPreferences.border
			} h-12 w-36 flex justify-center items-center hover:opacity-50 transition-all duration-200 ease`}
		>
			<span
				style={{ fontFamily: font || userPreferences.font.fontFamily }}
				className='text-base  font-semibold'
			>
				{children}
			</span>
		</div>
	);
};

export const OutlineButton = ({ children, color, border, font, textColor }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div
			style={{
				border: `1px solid ${color || userPreferences.color}`,
				borderColor: color || userPreferences.color,
			}}
			className={`${
				border || userPreferences.border
			} py-3 px-4 flex justify-center items-center hover:opacity-50 transition-all duration-200 ease`}
		>
			<span
				style={{
					fontFamily: font || userPreferences.font.fontFamily,
					color: textColor,
				}}
				className='text-base  font-semibold'
			>
				{children}
			</span>
		</div>
	);
};
