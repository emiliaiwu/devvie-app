import { useContext, useState } from "react";
import { AddIcon } from "../../data/icon";
import NewTaskItem from "./NewTaskItem";
import {
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";

const TaskList = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { newTask, setNewTask, isUpdating, setIsUpdating } =
		useContext(ProjectContext);
	const [listItemToAdd, setListItemToAdd] = useState("");
	const [updatedItem, setUpdatedItem] = useState({});
	const [updateItem, setUpdateItem] = useState(false)

	console.log(listItemToAdd);

	const handleAddItem = () => {
		if (listItemToAdd.trim() === "") {
			return;
		} else {
			// Create a new task object
			const newTaskItem = { task: listItemToAdd, checked: false };

			// Update the state using the previous state
			setNewTask((prev) => {
				return { ...prev, list: [...prev.list, newTaskItem] };
			});

			// Clear the input field
			setListItemToAdd("");
		}
	};

	const handleUpdate = (updatedItem) => {
		const indexToUpdate = newTask.list.findIndex(
			(item) => item.task === updatedItem.task
		);

		// If the item is found, update the listItems array
		if (indexToUpdate !== -1) {
			// Create a new array with the updated item
			const updatedListItems = [...newTask.list];
			updatedListItems[indexToUpdate] = { ...updatedItem, task: listItemToAdd };

			// Set the state with the updated array
			setNewTask((prev) => {
				return { ...prev, list: updatedListItems };
			});
		} else {
			// Handle the case where the item is not found
			console.error("Item not found for update");
		}

		setUpdatedItem({});
		setListItemToAdd("");
		setUpdateItem(false)
	};

	return (
		<div className='flex flex-col gap-1 mb-3'>
			<div className='flex justify-between items-center px-1'>
				<h1 className='text-base'>Task List</h1>
				<span className='text-sm pr-4'>{newTask.list.length}</span>
			</div>

			<div className='flex flex-col gap-5 relative'>
				<div className='flex flex-col ss:flex-row gap-3 w-full'>
					<div
						style={{
							backgroundColor: userPreferences.shade.background,
						}}
						className={`${userPreferences.border} w-full overflow-hidden`}
					>
						<input
							style={{
								borderColor: userPreferences.shade.background,
							}}
							type='text'
							placeholder='Add new task item here'
							value={listItemToAdd}
							className={`${userPreferences.border} w-full py-3 h-full bg-transparent outline-none border focus:border-white px-5 text-sm placeholder:text-sm`}
							onChange={(e) => setListItemToAdd(e.target.value)}
						/>
					</div>

					{/* add new item */}
					<button
						onClick={() =>
							!updateItem 
								? handleAddItem()
								: handleUpdate(updatedItem)
						}
						style={{
							backgroundColor: userPreferences.color,
							color: `${userPreferences.isLightMode ? "white" : "black"}`,
						}}
						className={`${userPreferences.border} flex justify-center items-center py-3 px-4 gap-1 text-sm `}
					>
						<AddIcon className='w-5 h-5' />{" "}
						{!updateItem ? "Add Item" : "Update Item"}
					</button>
				</div>

				<div className='flex flex-col gap-2 absolute ss:top-16 top-28  right-0 left-0'>
					{newTask.list.map((item, index) => (
						<NewTaskItem
							key={index}
							item={item}
							checked={item.checked}
							setListItems={setNewTask}
							setListItemToAdd={setListItemToAdd}
							listItems={newTask.list}
							setUpdatedItem={setUpdatedItem}
							setIsUpdating={setIsUpdating}
							setUpdateItem={setUpdateItem}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
