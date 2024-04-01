import { DateArrowIcon, DateDoubleArrowIcon } from "../data/icon";
import { useContext, useState } from "react";
import { UserPreferencesContext } from "../context";
import {  monthsOfYear } from "../data/projectData";

const ProjectDatePicker = () => {
	const { userPreferences } = useContext(UserPreferencesContext);

	const [currentDate, setCurrentDate] = useState(new Date());
	// const [selectedDay, setSelectedDay] = useState("1");
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	// const daysOfWeekAbbr = daysOfWeek.map((day) => day.slice(0, 3));
	const daysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const totalDays = daysInMonth(year, month);
	const firstDay = new Date(year, month, 1).getDay();
	const currentMonth = monthsOfYear[month];

	const previousMonth = new Date(year, month - 1);
	const previousMonthDays = daysInMonth(
		previousMonth.getFullYear(),
		previousMonth.getMonth()
	);

	// Calculate the number of empty cells before the 1st day
	const prevDays = Array.from({ length: firstDay }, (_, index) => (
		<span
			key={`empty-${index}`}
			style={{ color: userPreferences.shade.text.secondaryText }}
			className='p-2 flex items-center justify-center border-2 rounded-lg border-transparent'
		>
			{previousMonthDays - firstDay + index + 1}
		</span>
	));

	const nextDays = Array.from(
		{ length: (7 - ((totalDays + firstDay) % 7)) % 7 },
		(_, index) => (
			<span
				style={{ color: userPreferences.shade.text.secondaryText }}
				key={`empty-next-${index}`}
				className='p-2 flex items-center justify-center border-2 rounded-lg border-transparent '
			>
				{index + 1}
			</span>
		)
	);

	// handle functions
	const handleYearMonthChange = (newYear, newMonth) => {
		const today = new Date();
		const currentYear = today.getFullYear();
		const currentMonth = today.getMonth();

		if (
			newYear < currentYear ||
			(newYear === currentYear && newMonth < currentMonth)
		) {
			return;
		} else {
			setCurrentDate(new Date(newYear, newMonth, 1));
		}
    };
    

    

	
	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
				fontFamily: userPreferences.font.fontFamily,
				color: userPreferences.color,
			}}
			className={`${userPreferences.border} w-[350px] mx-auto py-5 px-6 flex flex-col justify-between`}
		>
			<div
				style={{ color: userPreferences.shade.text.primaryText }}
				className='flex justify-between items-center'
			>
				<div className=' flex items-center gap-1'>
					<span
						onClick={() => {
							handleYearMonthChange(year - 1, month);
						}}
						className='cursor-pointer opacity-60 hover:opacity-100'
					>
						<DateDoubleArrowIcon className='w-6 h-6' />
					</span>
					<span
						onClick={() => {
							handleYearMonthChange(year, month - 1);
						}}
						className='cursor-pointer opacity-60 hover:opacity-100'
					>
						<DateArrowIcon className='w-6 h-6' />
					</span>
				</div>

				<h1 className='text-lg flex items-center gap-2'>
					<span>{currentMonth}</span>
					<span>{year}</span>
				</h1>
				<div className=' flex items-center gap-1'>
					<span
						onClick={() => {
							handleYearMonthChange(year, month + 1);
						}}
						className='cursor-pointer opacity-60 hover:opacity-100 '
					>
						<DateArrowIcon className='w-6 h-6 rotate-180' />
					</span>
					<span
						onClick={() => {
							handleYearMonthChange(year + 1, month);
						}}
						className='cursor-pointer opacity-60 hover:opacity-100'
					>
						<DateDoubleArrowIcon className='w-6 h-6 rotate-180 cursor-pointer' />
					</span>
				</div>
			</div>

			<div></div>
		</div>
	);
};

export default ProjectDatePicker;
