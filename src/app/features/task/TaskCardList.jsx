import { useContext, useEffect, useState } from "react";
import {
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";
import { CheckedIcon, SquareIcon } from "../../data/icon";
import { HoverAccentColor } from "../../components";

const TaskCardList = ({ list, task }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const [isOpen, setIsOpen] = useState(false);
	const { setNewTask, newTask, } = useContext(ProjectContext);
	const {
		updatedTaskStatus,
		setUpdatedTaskStatus,
		handleUpdateTask,
		handleUpdateCheckList,
		editTask
	} = useContext(TaskContext);

	const [checkedStates, setCheckedStates] = useState(
		list?.map((item) => {
			return item.checked;
		})
	);

	const handleCheckboxChange = (index, task, list) => {
		editTask(task);
		const updatedList = [...list];
		updatedList[index].checked = !updatedList[index].checked;
		setNewTask((prev) => ({
			...prev,
			list: updatedList,
		}));

		setCheckedStates(
			list.map((item) => {
				return item.checked;
			})
		);

		handleUpdateCheckList();
	};

	

	const checkedItems = checkedStates?.filter((state) => state === true).length;

	const progress = list?.length > 0 ? (checkedItems / list?.length) * 100 : 0;

	return (
		<div>
			<div className={` flex flex-col gap-2 mb-2`}>
				<div
					onClick={() => setIsOpen(!isOpen)}
					className={`flex items-center justify-between cursor-pointer`}
				>
					<div className='text-sm flex items-center justify-between w-full'>
						<HoverAccentColor>
							<h2 className='font-semibold'>Task progress</h2>
						</HoverAccentColor>

						<h2 className='font-semibold'>
							{checkedItems}/{list?.length}
						</h2>
					</div>
				</div>

				{!isOpen && (
					<div
						style={{
							fontFamily: userPreferences.font.fontFamily,
							color: userPreferences.shade.text.primaryText,
						}}
						className='w-full'
					>
						<div
							style={{ backgroundColor: userPreferences.shade.other }}
							className='w-full h-[7px] rounded-full flex-1'
						>
							<div
								className='h-full transition-all ease-in-out duration-300 rounded-full'
								style={{
									backgroundColor: "#00A86B",
									width: `${progress}%`,
								}}
							></div>
						</div>
					</div>
				)}
			</div>
			{isOpen && (
				<div>
					<ul className='flex flex-col gap-3'>
						{list?.map((item, index) => (
							<li
								key={index}
								style={{ borderColor: userPreferences.shade.other }}
								className={`${userPreferences.border} text-sm px-3 py-2 border whitespace-normal`}
							>
								<div className='flex items-center gap-2'>
									<span className='relative flex justify-center items-center'>
										<HoverAccentColor>
											<input
												type='checkbox'
												value={item.checked}
												className='cursor-pointer absolute left-0 bg-transparent opacity-0 -z-0'
												onChange={() => handleCheckboxChange(index, task, list)}
											/>

											{item.checked ? (
												<CheckedIcon className='w-4 h-4' />
											) : (
												<SquareIcon className='w-4 h-4' />
											)}
										</HoverAccentColor>
									</span>

									<span className='flex items-start'>{item.task}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default TaskCardList;
