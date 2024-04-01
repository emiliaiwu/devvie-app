import { useContext } from "react";
import ThemeContext from "./ThemeContext";


const AccentColor = () => {
	const { handleColorChange, newUserPreferences, accentColors } = useContext(ThemeContext);

	
	
	return (
		<div className='grid xs:grid-cols-9 grid-cols-6 sm:grid-cols-12 gap-2 gap-y-8 w-full max-w-[500px] my-6'>
			{accentColors.map((color, index) => (
				<label
					key={index}
					className='relative flex justify-center items-center cursor-pointer hover:scale-[1.1] transition-all duration-200 ease'
				>
					<input
						type='radio'
						value={color}
						className=' bg-white accent-color'
						checked={newUserPreferences.color === color}
						onChange={() => handleColorChange(color)}
					/>
					<span
						style={{
							borderColor: color,
							backgroundColor:
								newUserPreferences.color === color ? "transparent" : color,
						}}
						className={`  w-8 h-8 rounded-full absolute border-[3px] transition-colors duration-100 ease`}
					></span>
					<span
						style={{ backgroundColor: color }}
						className='w-4 h-4 rounded-full bg-white absolute'
					>
						{" "}
					</span>
				</label>
			))}
		</div>
	);
};

export default AccentColor;
