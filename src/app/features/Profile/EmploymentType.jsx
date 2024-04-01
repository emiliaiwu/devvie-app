import { useContext, useState } from "react";
import { HoverAccentColor } from "../../components";
import { DropdownArrowIcon } from "../../data/icon";
import { UserPreferencesContext } from "../../context";

const EmploymentType = ({ employmentType, setFormData }) => {
	const [isOpen, setIsOpen] = useState(false);
    const { userPreferences } = useContext(UserPreferencesContext);
    const employmentTypes = [
			"Full-time",
			"Part-time",
			"Freelance",
			"Internship",
			"Contract",
    ];
    
    const handleEmploymentType = (type) => {
			setFormData((prevData) => ({
				...prevData,
				employmentType: type,
			}));
			setIsOpen(false);
		};
	return (
		<div className='relative w-full z-[20] '>
			<div
				style={{
					borderColor: userPreferences.shade.other,
					color: userPreferences.shade.text.secondaryText,
				}}
				className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none flex justify-between items-center`}
			>
				<span>
					{employmentType?.length === 0
						? "Choose employment type"
						: employmentType}
				</span>{" "}
				<span onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
					<HoverAccentColor>
						<DropdownArrowIcon
							className={`${isOpen ? "rotate-180" : ""} w-6 h-6`}
						/>
					</HoverAccentColor>
				</span>
			</div>
			{isOpen && (
				<div className='absolute top-16 w-full lg:w-2/3'>
					<ul
						style={{
							background: userPreferences.shade.card,
							borderColor: userPreferences.shade.other,
							color: userPreferences.shade.text.secondaryText,
						}}
						className={`${userPreferences.border}  border-[1.5px] flex flex-col gap-2 p-5`}
					>
						{employmentTypes.map((type, index) => (
							<li
								key={type + index}
								onClick={() => handleEmploymentType(type)}
								className='py-2 cursor-pointer text-sm'
							>
								{" "}
								<HoverAccentColor>{type}</HoverAccentColor>{" "}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default EmploymentType;
