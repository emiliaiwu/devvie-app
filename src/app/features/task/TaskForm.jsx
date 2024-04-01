import { useContext } from "react";
import { ProjectContext, UserPreferencesContext } from "../../context";

export const TaskForm = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { newTask, setNewTask } = useContext(ProjectContext);
	const titleCharacterLimit = 35;
	const descriptionCharacterLimit = 100;

	const handleInputChange = (fieldName, value) => {
		if (value.length > `${fieldName}CharacterLimit`) {
			return;
		}
		if (fieldName === "title") {
			setNewTask((prevFormValues) => ({
				...prevFormValues,
				[fieldName]: value,
			}));
		} else {
			setNewTask((prevFormValues) => ({
				...prevFormValues,
				[fieldName]: value,
			}));
		}
	};

	return (
		<form className='w-full'>
			<div className='flex flex-col gap-1 mb-4'>
				<label className='flex text-base justify-between items-center px-1'>
					{" "}
					Title{" "}
					<span
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm flex self-end'
					>
						{newTask?.title.length}/{titleCharacterLimit}
					</span>
				</label>
				<input
					style={{ backgroundColor: userPreferences.shade.background }}
					type='text'
					id='title'
					name='title'
					placeholder='Enter your project title'
					value={newTask?.title}
					onChange={(e) => handleInputChange("title", e.target.value)}
					className={`${userPreferences.border} w-full px-4 py-2 focus:outline-none text-base mb-1 placeholder:text-sm`}
				/>
			</div>

			<div className='flex flex-col gap-1 '>
				<label
					htmlFor='description'
					className='flex text-base justify-between items-center px-1'
				>
					Description{" "}
					<span
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm flex self-end'
					>
						{newTask?.description.length}/{descriptionCharacterLimit}
					</span>
				</label>
				<div
					style={{ backgroundColor: userPreferences.shade.background }}
					className={`${userPreferences.border} overflow-hidden mb-1 px-4 py-3 m-auto w-full`}
				>
					<textarea
						style={{ backgroundColor: userPreferences.shade.background }}
						id='description'
						value={newTask?.description}
						onChange={(e) =>
							handleInputChange("description", e.target.value)
						}
						placeholder='Enter your project description'
						rows={4}
						className={`focus:outline-none text-sm scroll leading-6 w-full p-1 placeholder:text-sm`}
					/>
				</div>
			</div>
		</form>
	);
};
