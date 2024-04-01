import { CalendarIcon } from "../data/icon";
import { useContext } from "react";
import { ProjectContext, UserPreferencesContext } from "../context";
import HoverAccentColor from "./HoverAccentColor";
import DatePicker from "./DatePicker";
import Popup from "./Popup";

const ChooseDueDate = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		setSelectedDueDate,
		isDueDateOpen,
		setIsDueDateOpen,
		setNewProject,
		newProject,
		setDateToCompare,
	} = useContext(ProjectContext);

	return (
		<div
			style={{ fontFamily: userPreferences.font.fontFamily }}
			className='w-full relative'
		>
			<div className='mb-3 px-1'>
				<h1
					style={{
						color: userPreferences.shade.text.primaryText,
					}}
					className='text-base'
				>
					Due Date
				</h1>
			</div>
			<div>
				<div
					style={{
						backgroundColor: userPreferences.shade.card,
						color: userPreferences.shade.text.secondaryText,
					}}
					className={`${userPreferences.border} w-full flex items-center gap-2 py-4 px-5`}
				>
					<span className='w-full text-base'>{newProject.dueDate}</span>
					<span
						onClick={() => setIsDueDateOpen(true)}
						className='cursor-pointer'
					>
						<HoverAccentColor>
							<CalendarIcon className='w-5 h-5' />
						</HoverAccentColor>
					</span>
				</div>
			</div>
			{isDueDateOpen && (
				<Popup isOpen={isDueDateOpen} setIsOpen={setIsDueDateOpen}>
					<div
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						<DatePicker
							setSelectedDate={setSelectedDueDate}
							setOpen={setIsDueDateOpen}
							dateType='dueDate'
							setNewProject={setNewProject}
							setDateToCompare={setDateToCompare}
						/>
					</div>
				</Popup>
			)}
		</div>
	);
};

export default ChooseDueDate;
