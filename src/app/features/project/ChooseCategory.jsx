import { ProjectContext, UserPreferencesContext } from "../../context";
import { useContext, useState } from "react";
import { DropdownArrowIcon } from "../../data/icon";
import { category } from "../../data/projectData";

const ChooseCategory = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { selectedCategory, setSelectedCategory } = useContext(ProjectContext);

	const [isCategoryOpen, setIsCategoryOpen] = useState(false);

	const handleSelect = (e) => {
		setSelectedCategory(e.target.innerText);
		setIsCategoryOpen(false);
	};

	return (
		<div className='w-1/3 relative'>
			<div className='mb-3 px-1'>
				<h1 className='text-base'>Category</h1>
			</div>
			<div className='w-full flex gap-5 flex-col'>
				<div
					style={{
						backgroundColor: userPreferences.shade.card,
						color: userPreferences.shade.text.secondaryText,
					}}
					className={`${userPreferences.border} flex justify-between px-4 py-3 items-center `}
				>
					<span>{selectedCategory}</span>{" "}
					<span
						onClick={() => setIsCategoryOpen(!isCategoryOpen)}
						className='cursor-pointer'
					>
						<DropdownArrowIcon
							className={`${
								isCategoryOpen ? "rotate-180" : ""
							} w-6 h-6 transition-all duration-200 ease`}
						/>
					</span>
				</div>
				{isCategoryOpen && (
					<div
						onMouseLeave={() => setIsCategoryOpen(false)}
						className='absolute w-full top-24 z-50'
					>
						<ul
							style={{
								backgroundColor: userPreferences.shade.card,
								color: userPreferences.shade.text.primaryText,
								borderColor: userPreferences.shade.other,
							}}
							className={`${userPreferences.border} p-3 border`}
						>
							{category.map((cat) => (
								<li
									key={cat}
									onClick={handleSelect}
									className='p-2 mb-1 hover:opacity-100 opacity-60 transition-opacity duration-200 ease capitalize'
								>
									{cat}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChooseCategory;
