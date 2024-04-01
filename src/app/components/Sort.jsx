import { SortIcon } from "../data/icon";
import { useContext } from "react";
import { UserPreferencesContext } from "../context";
import HoverAccentColor from "./HoverAccentColor";

const Sort = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	return (
		<div
			style={{
				color: userPreferences.shade.text.secondaryText,
				backgroundColor: userPreferences.shade.card,
			}}
			className={` py-2 px-3 cursor-pointer ${userPreferences.border}`}
		>
			<HoverAccentColor className={"flex text-sm items-center gap-1"}>
				<SortIcon className='w-5 h-5' /> Sort: priority
			</HoverAccentColor>
		</div>
	);
};

export default Sort;
