import { useContext, useCallback } from "react";

import { DropdownArrowIcon } from "../../data/icon";
import ThemeContext from "./ThemeContext";

const FontStyle = () => {
	const {
		toggleDropdown,
		isOpen,
		fontOptions,
		handleFontClick,
		fontNames,
		newUserPreferences,
		setIsOpen,
	} = useContext(ThemeContext);

	const memoizedToggleDropDown = useCallback(toggleDropdown, [toggleDropdown]);
	const memoizedFontClick = useCallback(handleFontClick, [handleFontClick]);

	return (
		<div className='lg:w-1/3 relative w-full sm:w-2/3 '>
			<div
				style={{ backgroundColor: newUserPreferences.shade.other }}
				onClick={memoizedToggleDropDown}
				className={`${newUserPreferences.border} py-3 px-5 flex justify-between items-center mb-4 bg-opacity-40 cursor-pointer`}
			>
				<span
					style={{ color: newUserPreferences.shade.text.primaryText }}
					className=' text-sm md:text-base font-medium'
				>
					{newUserPreferences.font.fontName}
				</span>
				<span className='text-white'>
					<DropdownArrowIcon
						style={{ color: newUserPreferences.shade.text.primaryText }}
						className={`${
							isOpen && "rotate-180"
						} w-6 h-6 transition-all duration-150 ease cursor-pointer`}
					/>
				</span>
			</div>
			{isOpen && (
				<div
					style={{
						backgroundColor: newUserPreferences.shade.other,
					}}
					onMouseLeave={() => setIsOpen(false)}
					className={`${newUserPreferences.border} bg-opacity-40 overflow-hidden px-1 py-5 absolute w-full z-50`}
				>
					<ul
						style={{
							backgroundColor: newUserPreferences.shade.other,
							"--bgg-color": newUserPreferences.shade.card,
						}}
						className='scroll overflow-y-scroll h-[calc(250px-50px)] w-full px-3'
					>
						{fontOptions.map((font, index) => (
							<li
								key={index}
								onClick={() => memoizedFontClick(font, index)}
								style={{
									transition: ".2s all ease",
									color: newUserPreferences.shade.text.primaryText,
								}}
								className={`${newUserPreferences.border} w-full hover:bg-[--bgg-color] cursor-pointer text-sm h-10 px-4 flex items-center`}
							>
								<span className=''>{fontNames[index]}</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default FontStyle;
