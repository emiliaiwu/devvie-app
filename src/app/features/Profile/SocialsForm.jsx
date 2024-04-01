import { useContext, useState } from "react";
import { UserPreferencesContext, UserProfileContext } from "../../context";
import {
	Github,
	Gmail,
	Instagram,
	Linkedin,
} from "../../data/icon";

const SocialsForm = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { setUserProfile, userProfile } = useContext(UserProfileContext);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserProfile((prev) => ({
			...prev,
			socials: {
				...prev.socials,
				[name]: value,
			},
		}));
	};

	return (
		<div>
			<form className='grid lg:grid-cols-2 gap-6'>
				<label
					style={{
						borderColor: userPreferences.shade.other,
						color: userPreferences.shade.text.secondaryText,
					}}
					htmlFor='instagram'
					className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full border-[1.5px] flex items-center gap-3 `}
				>
					<Instagram className='w-7 h-7' />

					<input
						type='url'
						id='instagram'
						name='instagram'
						placeholder='Enter your Instagram link'
						value={userProfile.socials.instagram}
						onChange={handleChange}
						className='bg-transparent  outline-none w-full'
					/>
				</label>

				<label
					style={{
						borderColor: userPreferences.shade.other,
						color: userPreferences.shade.text.secondaryText,
					}}
					htmlFor='github'
					className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full border-[1.5px] flex items-center gap-3 `}
				>
					<Github className='w-6 h-6' />

					<input
						type='url'
						id='github'
						name='github'
						placeholder='Enter your github link'
						value={userProfile.socials.github}
						onChange={handleChange}
						className='bg-transparent  outline-none w-full'
					/>
				</label>

				
				<label
					style={{
						borderColor: userPreferences.shade.other,
						color: userPreferences.shade.text.secondaryText,
					}}
					htmlFor='linkedIn'
					className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full border-[1.5px] flex items-center gap-3 `}
				>
					<Linkedin className='w-6 h-6' />

					<input
						type='url'
						id='linkedIn'
						name='linkedIn'
						placeholder='Enter your linkedIn link'
						value={userProfile.socials.linkedIn}
						onChange={handleChange}
						className='bg-transparent  outline-none w-full'
					/>
				</label>

				<label
					style={{
						borderColor: userPreferences.shade.other,
						color: userPreferences.shade.text.secondaryText,
					}}
					htmlFor='email'
					className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full border-[1.5px] flex items-center gap-3 `}
				>
					<Gmail className='w-6 h-6' />

					<input
						type='email'
						id='email'
						name='email'
						placeholder='Enter your email'
						value={userProfile.socials.email}
						onChange={handleChange}
						className='bg-transparent  outline-none w-full'
					/>
				</label>

				{/* <label
					style={{
						borderColor: userPreferences.shade.other,
						color: userPreferences.shade.text.secondaryText,
					}}
					htmlFor='phoneNumber'
					className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full border-[1.5px] flex items-center gap-3 `}
				>
					<Call className='w-6 h-6' />

					<input
						type='tel'
						id='phoneNumber'
						name='phoneNumber'
						placeholder='Enter your phone number '
						value={userProfile.socials.phoneNumber}
						onChange={handleChange}
						className='bg-transparent  outline-none w-full'
					/>
				</label> */}
			</form>
		</div>
	);
};

export default SocialsForm;
