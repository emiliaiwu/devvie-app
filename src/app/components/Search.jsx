import { SearchIcon } from "../data/icon";
import { UserPreferencesContext } from "../context";
import { useContext } from "react";

const Search = () => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div
			style={{
				color: userPreferences.shade.text.secondaryText,
				backgroundColor: userPreferences.shade.other,
			}}
			className={`${userPreferences.border} flex items-center md:h-10 h-9 md:w-[250px] lg:w-[350px] md:px-6 w-10 justify-center`}
		>
			<button className='h-full flex justify-center items-center md:mr-3 w-full md:w-5'>
				<SearchIcon className='w-5 h-5' />
			</button>

			<input
				style={{
					color: userPreferences.shade.text.primaryText,
				}}
				type='text'
				id='searchInput'
				placeholder='Search...'
				className='text-sm outline-none h-full hidden md:flex bg-transparent whitespace-nowrap flex-1'
			/>
		</div>
	);
};

export default Search;
