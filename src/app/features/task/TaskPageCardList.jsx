import { useContext } from "react";
import { UserPreferencesContext } from "../../context";


const TaskPageCardList = ({ list, task }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	const checkedStates = list?.map((item) => {
		return item.checked;
	});

	const checkedItems = checkedStates?.filter((state) => state === true).length;

	const progress = list?.length > 0 ? (checkedItems / list?.length) * 100 : 0;

	return (
		<div>
			<div className={` flex flex-col gap-2 mb-2`}>
				<div className={`flex items-center justify-between`}>
					<div className='text-sm flex items-center justify-between w-full'>
						<h2 className='font-semibold'>Task progress</h2>

						<h2 className='font-semibold'>
							{checkedItems}/{list?.length}
						</h2>
					</div>
				</div>

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
			</div>
		</div>
	);
};

export default TaskPageCardList;
