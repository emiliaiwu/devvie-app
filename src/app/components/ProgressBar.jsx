import { useContext } from "react";
import { UserPreferencesContext } from "../context";

const ProgressBar = ({ progress, techstack, color }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div
			style={{
				fontFamily: userPreferences.font.fontFamily,
				color: userPreferences.shade.text.primaryText,
			}}
			className='w-full'
		>
			<h2 className='text-sm'>{techstack}</h2>
			<div className='flex items-center w-full gap-2'>
				<div
					style={{ backgroundColor: userPreferences.shade.other }}
					className='w-full h-2 rounded-full flex-1'
				>
					<div
						className='h-full transition-all ease-in-out duration-300 rounded-full'
						style={{
							backgroundColor: color,
							width: `${progress}%`,
						}}
					></div>
				</div>
				<p className="text-xs">{progress}%</p>
			</div>
		</div>
	);
};

export default ProgressBar;
