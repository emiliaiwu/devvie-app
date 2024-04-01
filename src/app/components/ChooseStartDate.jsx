import { CalendarIcon } from "../data/icon";
import { useContext, useEffect} from "react";
import { ProjectContext, UserPreferencesContext } from "../context";
import HoverAccentColor from "./HoverAccentColor";
import DatePicker from "./DatePicker";
import Popup from "./Popup";

const ChooseStartDate = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		setSelectedStartDate,
		isStartDateOpen,
		setIsStartDateOpen,
		setNewProject,
		newProject,
		setDateToCompare,
	} = useContext(ProjectContext);


	useEffect(() => {

	}, [])

	
	return (
		<div
			style={{ fontFamily: userPreferences.font.fontFamily }}
			className='w-full'
		>
			<div className='my-2 px-1'>
				<h1
					style={{
						color: userPreferences.shade.text.primaryText,
					}}
					className='text-base'
				>
					Start Date
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
					<span className='w-full text-base'>{newProject.startDate}</span>
					<span
						onClick={() => setIsStartDateOpen(true)}
						className='cursor-pointer'
					>
						<HoverAccentColor>
							<CalendarIcon className='w-5 h-5' />
						</HoverAccentColor>
					</span>
				</div>
			</div>
			{isStartDateOpen && (
				<Popup isOpen={isStartDateOpen} setIsOpen={setIsStartDateOpen}>
					<div>
						<DatePicker
							setSelectedDate={setSelectedStartDate}
							setOpen={setIsStartDateOpen}
							setNewProject={setNewProject}
							dateType='startDate'
							setDateToCompare={setDateToCompare}						/>
					</div>
				</Popup>
			)}
		</div>
	);
};

export default ChooseStartDate;
