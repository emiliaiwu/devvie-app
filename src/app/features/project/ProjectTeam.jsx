import { InviteIcon } from "../../data/icon";
import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext, useState } from "react";
import { HoverAccentColor } from "../../components";

const ProjectTeam = () => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div className='w-full'>
			<div>
				<h1 className='mb-4 text-base px-1'>Invite Team Members</h1>
				<form
					style={{ backgroundColor: userPreferences.shade.card }}
					className={`${userPreferences.border} flex items-center w-full gap-3 px-4 py-3`}
				>
					<input
						type='email'
						style={{ color: userPreferences.shade.text.secondaryText }}
						placeholder="Enter user's correct email"
						className='w-full bg-transparent h-full text-base focus:outline-none py-1'
					/>
					<button style={{ color: userPreferences.shade.text.secondaryText }}>
						<HoverAccentColor>
							<InviteIcon className='w-5 h-5' />
						</HoverAccentColor>
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProjectTeam;
