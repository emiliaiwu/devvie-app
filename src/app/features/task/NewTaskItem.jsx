import { useContext } from "react";
import { HoverAccentColor } from "../../components";
import { DeleteIcon, EditCircleIcon } from "../../data/icon";
import { UserPreferencesContext } from "../../context";
import { list } from "postcss";

const NewTaskItem = ({
	item,
	setListItems,
	setListItemToAdd,
	listItems,
	setUpdatedItem,
	setIsUpdating,
	setUpdateItem,
}) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	const handleEdit = (item) => {
		setIsUpdating(true);
		setUpdateItem(true)
		setListItemToAdd(item.task);
		setUpdatedItem(item);
	};

	const handleDelete = (item) => {
		const newListItems = listItems.filter(
			(listItem) => item.task !== listItem.task
		);
		setListItems((prev) => {
			return { ...prev, list: newListItems };
		}); // Assuming you want to update the state with the new list
	};

	return (
		<div
			style={{
				borderColor: userPreferences.shade.other,
				color: userPreferences.shade.text.secondaryText,
			}}
			className={`${userPreferences.border} flex justify-between items-start gap-3 py-3  px-4 border`}
		>
			<span className='text-sm whitespace-normal'>{item.task}</span>{" "}
			<div className='flex justify-between items-center gap-2'>
				<span onClick={() => handleEdit(item)} className='cursor-pointer'>
					<HoverAccentColor>
						<EditCircleIcon className='w-4 h-4' />
					</HoverAccentColor>
				</span>
				<span onClick={() => handleDelete(item)} className='cursor-pointer'>
					<HoverAccentColor>
						<DeleteIcon className='w-4 h-4' />
					</HoverAccentColor>
				</span>
			</div>
		</div>
	);
};

export default NewTaskItem;
