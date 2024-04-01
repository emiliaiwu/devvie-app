import { useContext, useState } from "react";
import {
	UserPreferencesContext,
	UserProfileContext,
} from "../../context";
import { HoverAccentColor } from "../../components";
import { CancelCircleIcon, DropdownArrowIcon } from "../../data/icon";

const SkillsForm = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { userProfile, setUserProfile } = useContext(UserProfileContext);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const skillsCategory = ["Languages", "Frameworks", "Tools", "Other"];
	const [skill, setSkill] = useState();

	const handleAddSkills = () => {
		const names = skill.split(",").map((name) => name.trim());
		const filteredNames = names.filter((name) => name !== "");
		setUserProfile((prevData) => ({
			...prevData,
			techStack: [...prevData.techStack, ...filteredNames],
		}));

		setSkill("");
		setSelectedCategory("");
	};

	const handleRemoveSkills = (i) => {
		setUserProfile((prevData) => ({
			...prevData,
			techStack: prevData.techStack.filter((name, index) => index !== i),
		}));
	};

	const handleSelectedCategory = (type) => {
		setSelectedCategory(type);
		setIsOpen(false);
	};

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col md:flex-row items-center gap-6'>
				<div className='relative w-full'>
					<div
						style={{
							borderColor: userPreferences.shade.other,
							color: userPreferences.shade.text.secondaryText,
						}}
						className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none flex justify-between items-center`}
					>
						<span>
							{selectedCategory.length !== 0
								? selectedCategory
								: "Choose skills category"}
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
						<div className='absolute top-16 w-2/3'>
							<ul
								style={{
									background: userPreferences.shade.card,
									borderColor: userPreferences.shade.other,
									color: userPreferences.shade.text.secondaryText,
								}}
								className={`${userPreferences.border} border-[1.5px] flex flex-col gap-2 p-5`}
							>
								{skillsCategory.map((type, index) => (
									<li
										key={type + index}
										onClick={() => handleSelectedCategory(type)}
										className='py-1 cursor-pointer'
									>
										{" "}
										<HoverAccentColor>{type}</HoverAccentColor>{" "}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<label className='w-full'>
					<input
						style={{ borderColor: userPreferences.shade.other }}
						type='text'
						value={skill}
						placeholder='Enter skills separated by comma'
						onChange={(e) => setSkill(e.target.value)}
						className={`${userPreferences.border} text-sm lg:text-base py-2 px-4 w-full bg-transparent border-[1.5px] outline-none `}
					/>
				</label>
				<button
					onClick={handleAddSkills}
					style={{
						backgroundColor: userPreferences.color,
						color: userPreferences.isLightMode ? "white" : "black",
					}}
					className={`${userPreferences.border} py-2 px-4 text-sm lg:text-base md:w-1/2  w-full  hover:scale-110 transition-all duration-200 ease`}
					type='button'
				>
					Add skills
				</button>
			</div>
			<div
				style={{ borderColor: userPreferences.shade.other }}
				className={`${userPreferences.border} text-sm lg:text-base py-3 px-4 w-full min-h-[120px] bg-transparent border-[1.5px] flex gap-2 flex-wrap`}
			>
				{userProfile.techStack.map((skill, index) => (
					<div key={skill}>
						<div
							style={{
								borderColor: userPreferences.shade.other,
								color: userPreferences.shade.text.secondaryText,
							}}
							className={`${userPreferences.border} px-3 py-1 border text-xs lg:text-sm flex items-center gap-1 capitalize`}
						>
							{skill}
							<span
								onClick={() => handleRemoveSkills(index)}
								className='cursor-pointer'
							>
								<CancelCircleIcon className='w-4 h-4' />
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SkillsForm;
