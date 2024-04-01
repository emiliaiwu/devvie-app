import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const BorderRadius = () => {
	const {
		newUserPreferences,
		borderRadiusOptions,
		handleBorderClick,
	} = useContext(ThemeContext);

	return (
		<div className='flex flex-wrap gap-3 md:max-w-[600px]'>
			{borderRadiusOptions.map((border) => (
				<span
					onClick={() => handleBorderClick(border.style)}
					key={border.name}
					style={{
						fontFamily: newUserPreferences.font.fontFamily,
						color: newUserPreferences.shade.background,
						backgroundColor:
							border.style === newUserPreferences.border
								? newUserPreferences.color
								: newUserPreferences.shade.text.primaryText,
					}}
					className={`${border.style} font-DMSans text-sm py-3 md:px-6 px-4 hover:scale-[1.05] ease cursor-pointer transition-all duration-100`}
				>
					{border.name}
				</span>
			))}
		</div>
	);
};

export default BorderRadius;
