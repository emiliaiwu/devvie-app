import { img1, img2, img3, img4, img5, img6 } from "../../assets";
import { useContext } from "react";
import { UserPreferencesContext } from "../context";
const team = [img1, img2, img3, img4, img5, img6];

const TeamImg = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const firstThreeMembers = team.slice(0, 3);
	const remainingMembers = team.slice(3);
	return (
		<div
			style={{
				color: userPreferences.shade.text.primaryText,
				fontFamily: userPreferences.font.fontFamily,
			}}
		>
			<div className='flex'>
				{firstThreeMembers.map((item, index) => (
					<div
						style={{ border: `2px solid ${userPreferences.shade.background}` }}
						key={index}
						className='w-8 h-8 rounded-full overflow-hidden -ml-2'
					>
						<img src={item} alt='teams' className='object-cover' />
					</div>
				))}
				{remainingMembers.length > 0 && (
					<div
						style={{
							border: `1px solid ${userPreferences.shade.background} `,
							color: userPreferences.shade.text.primaryText,
							backgroundColor: userPreferences.shade.other,
						}}
						className='w-8 h-8 rounded-full overflow-hidden -ml-2 flex justify-center items-center text-sm'
					>
						+{remainingMembers.length}
					</div>
				)}
			</div>
		</div>
	);
};

export default TeamImg;
