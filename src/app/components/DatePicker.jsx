import { DateArrowIcon, DateDoubleArrowIcon } from "../data/icon";
import { useContext, useState } from "react";
import { UserPreferencesContext } from "../context";
import { daysOfWeek, monthsOfYear } from "../data/projectData";

const DatePicker = ({
	setSelectedDate,
	setOpen,
	setNewProject,
	dateType,
	setDateToCompare,
}) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const daysAbbreviations = daysOfWeek.map((day) => day.slice(0, 3));
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState("1");
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};
	// const currentDay = new Date().getDate();
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

	const handleClick = (day) => {
		const today = new Date();
		const selectedDate = new Date(year, month, day + 1);

		if (selectedDate >= today) {
			setSelectedDay(day);
		} else {
			alert("You cannot select a past date.");
		}
	};

	const handleClear = () => {
		setOpen(false);
	};

	const handleSave = () => {
		const selectedDate = new Date(year, month, selectedDay);
		// const dayOfWeek = selectedDate.getDay();
		const monthOfYear = selectedDate.getMonth();
		const formattedDay = String(selectedDay).padStart(2, "0");
		const formattedDate = `${year}-${monthOfYear}-${formattedDay}`;
		const selectedMonth = monthsOfYear[month].slice(0, 3);
		const date = `${formattedDay} ${selectedMonth}, ${year}`;
		setSelectedDate(date);

		if (dateType === "startDate") {
			setNewProject((prev) => ({ ...prev, startDate: date }));
			setDateToCompare((prev) => ({ ...prev, startDate: formattedDate }));
		} else if (dateType === "dueDate") {
			setNewProject((prev) => ({ ...prev, dueDate: date }));
			setDateToCompare((prev) => ({ ...prev, dueDate: formattedDate }));
		}

		setOpen(false);
	};

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

	// Generate an array of dates for the month
	const days = Array.from({ length: totalDays }, (_, index) => {
		const dayNumber = index + 1;
		const today = new Date();
		const thisMonth = today.getMonth();
		const currentDay = today.getDate();
		const isPast = thisMonth && dayNumber < currentDay;

		return (
			<span
				key={index + 1}
				onClick={() => handleClick(dayNumber)}
				style={{
					borderColor: `${
						index + 1 === selectedDay || index + 1 === currentDay
							? userPreferences.color
							: userPreferences.shade.other
					}`,
					backgroundColor:
						index + 1 === currentDay
							? userPreferences.color
							: userPreferences.shade.other,
					color: userPreferences.shade.text.primaryText,
					opacity: `${isPast ? "0.5" : "1"}`,
				}}
				className={`py-2 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-60 border-2`}
			>
				{dayNumber}
			</span>
		);
	});

	return (
		<div
			onClick={(event) => {
				event.stopPropagation();
			}}
			style={{
				backgroundColor: userPreferences.shade.card,
				borderColor: userPreferences.shade.other,
				fontFamily: userPreferences.font.fontFamily,
			}}
			className={`${userPreferences.border} w-[280px] ss:w-[300px] md:w-[350px] mx-auto py-5 px-4 border flex flex-col gap-6 justify-between`}
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

				<h1 className='text-base md:text-lg flex items-center gap-2'>
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

			<div className='w-full flex flex-col h-full'>
				<div className='grid grid-cols-7 w-full mb-3'>
					{daysAbbreviations.map((day) => (
						<span
							style={{ color: userPreferences.shade.text.secondaryText }}
							key={day}
							className='text-sm md:text-[15px] font-medium flex items-center justify-center'
						>
							{day}
						</span>
					))}
				</div>

				<div className='grid grid-cols-7 gap-[5px] text-xs md:text-sm flex-1'>
					{prevDays}
					{days}
					{nextDays}
				</div>
			</div>

			<div className='flex justify-between items-center gap-3'>
				<button
					onClick={handleClear}
					style={{
						backgroundColor: userPreferences.shade.other,
						color: userPreferences.shade.text.primaryText,
					}}
					className={`${userPreferences.border} py-2 w-full cursor-pointer text-sm`}
				>
					Cancel
				</button>
				<button
					onClick={handleSave}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? 'white' : 'black',
					}}
					className={`${userPreferences.border} py-2 w-full cursor-pointer text-sm`}
				>
					Save Date
				</button>
			</div>
		</div>
	);
};

export default DatePicker;
