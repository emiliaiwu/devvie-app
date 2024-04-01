import { useContext } from "react";
import Mode from "./Mode";
import ThemeContext from "./ThemeContext";
import { CheckCircle } from "../../data/icon";
import ShadeComponent from "./ShadeComponent";

const LightDarkMode = () => {
	const {
		lightShades,
		handleLightMode,
		handleDarkMode,
		darkShades,
		selectedLightShade,
		selectedDarkShade,
		newUserPreferences,
		handleLightShade,
		handleDarkShade,
	} = useContext(ThemeContext);


	return (
		<div className='w-full lg:px-0 flex lg:items-start flex-col sm:justify-normal justify-center items-center sm:items-start'>
			<div className='flex flex-col sm:flex-row justify-center sm:justify-normal gap-6 mb-10'>
				<div className='flex flex-col items-start lg:items-center gap-5 mb-6 lg:mb-0'>
					<button
						className={`${newUserPreferences.border} p-2 relative hover:scale-[1.05] transition-all duration-200 ease`}
						onClick={handleLightMode}
						style={{
							backgroundColor: lightShades[selectedLightShade].background,
							border: "5px solid",
							borderColor:
								newUserPreferences.mode === "light"
									? newUserPreferences.color
									: lightShades[selectedLightShade].background,
						}}
					>
						<Mode
							bgColor={lightShades[selectedLightShade].background}
							card={lightShades[selectedLightShade].card}
							other={lightShades[selectedLightShade].other}
						/>
						{newUserPreferences.mode === "light" && (
							<CheckCircle
								style={{
									color: newUserPreferences.color,
								}}
								className='absolute right-3 bottom-3 w-8 h-8'
							/>
						)}
					</button>
					<h3
						style={{
							fontFamily: newUserPreferences.font.fontFamily,
							color: newUserPreferences.shade.text.primaryText,
						}}
						className='text-sm font-medium text-center pl-2'
					>
						Light Mode
					</h3>
				</div>
				<div className='flex flex-col lg:items-center items-start gap-5'>
					<button
						onClick={handleDarkMode}
						className={`${newUserPreferences.border} pt-2 px-2 relative hover:scale-[1.05] transition-all duration-200 ease`}
						style={{
							backgroundColor: darkShades[selectedDarkShade].background,
							border: "5px solid",
							borderColor:
								newUserPreferences.mode === "dark"
									? newUserPreferences.color
									: darkShades[selectedDarkShade].background,
						}}
					>
						<Mode
							bgColor={darkShades[selectedDarkShade].background}
							card={darkShades[selectedDarkShade].card}
							other={darkShades[selectedDarkShade].other}
						/>
						{newUserPreferences.mode === "dark" && (
							<CheckCircle
								style={{
									color: newUserPreferences.color,
								}}
								className='absolute right-3 bottom-3 w-8 h-8'
							/>
						)}
					</button>
					<h3
						style={{
							fontFamily: newUserPreferences.font.fontFamily,
							color: newUserPreferences.shade.text.primaryText,
						}}
						className='text-sm font-medium pl-2'
					>
						Dark Mode
					</h3>
				</div>
			</div>

			<h3
				style={{
					fontFamily: newUserPreferences.font.fontFamily,
					color: newUserPreferences.shade.text.primaryText,
				}}
				className=' text-sm font-medium mb-5 sm:text-left text-center'
			>
				Choose your preferred shade
			</h3>
			<div className='grid grid-cols-1 sm:grid-cols-3 xs:grid-cols-2 grid-flow-row md:grid-cols-4 lg:items-start lg:flex-row gap-5'>
				{newUserPreferences.mode === "light"
					? Object.keys(lightShades).map((shade, index) => (
							<div key={index} className='flex flex-col items-center w-full '>
								<button
									onClick={() => handleLightShade(shade)}
									style={{
										backgroundColor: lightShades[shade].background,
										border: "3px solid",
										borderColor:
											newUserPreferences.shade.name === shade
												? newUserPreferences.color
												: lightShades[shade].other,
									}}
									className={`${newUserPreferences.border} pt-1 px-1 overflow-hidden w-40 hover:scale-[1.05] transition-all duration-200 ease`}
								>
									<ShadeComponent
										bgColor={lightShades[shade].background}
										card={lightShades[shade].card}
										other={lightShades[shade].other}
									/>
								</button>
								<h4
									style={{
										fontFamily: newUserPreferences.font.fontFamily,
										color: newUserPreferences.shade.text.primaryText,
									}}
									className=' text-xs mt-4 font-medium'
								>
									{shade}
								</h4>
							</div>
					  ))
					: Object.keys(darkShades).map((shade, index) => (
							<div key={index} className='flex flex-col items-center'>
								<button
									onClick={() => handleDarkShade(shade)}
									style={{
										backgroundColor: darkShades[shade].background,
										border: "3px solid",
										borderColor:
											newUserPreferences.shade.name === shade
												? newUserPreferences.color
												: darkShades[shade].other,
									}}
									className={`${newUserPreferences.border} pt-1 px-1 overflow-hidden w-40 hover:scale-[1.05] transition-all duration-200 ease`}
								>
									<ShadeComponent
										bgColor={darkShades[shade].background}
										card={darkShades[shade].card}
										other={darkShades[shade].other}
									/>
								</button>
								<h4
									style={{
										fontFamily: newUserPreferences.font.fontFamily,
										color: newUserPreferences.shade.text.primaryText,
									}}
									className=' text-xs mt-4 font-bold'
								>
									{shade}
								</h4>
							</div>
					  ))}
			</div>
		</div>
	);
};

export default LightDarkMode;
