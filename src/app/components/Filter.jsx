import { useContext} from "react";
import { UserPreferencesContext } from "../context";
import { FilterIcon } from "../data/icon";
import HoverAccentColor from "./HoverAccentColor";

const Filter = ({ handleFilter, isFilterOpen }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div
			onClick={handleFilter}
			style={{
				backgroundColor: userPreferences.shade.card,
				color: `${
					isFilterOpen
						? userPreferences.color
						: userPreferences.shade.text.secondaryText
				}`,
			}}
			className={` py-2 px-3 cursor-pointer  ${userPreferences.border}`}
		>
			<HoverAccentColor className={"flex gap-1 items-center text-sm"}>
				<FilterIcon className='w-4 h-5' /> <span>Add filter</span>
			</HoverAccentColor>
		</div>
	);
};

export default Filter;
