import { useContext } from "react";
import { LibraryContext, UserPreferencesContext } from "../../context";
import { collectionColors } from "../../data/projectData";
import { ClipLoader } from "react-spinners";

const CreateFolderModal = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		handleCreateCollection,
		newCollection,
		setNewCollection,
		initialCollection,
		setIsCreateNewCollectionOpen,
		isSubmitting,
		isUpdating,
		handleUpdateCollection,
	} = useContext(LibraryContext);

	// const [collectionTitle, setCollectionTitle] = useState("");
	// const [selectedColor, setSelectedColor] = useState("");
	// const [description, setDescription] = useState("");

	const handleChange = (fieldName, value) => {
		if (fieldName in newCollection) {
			setNewCollection((prev) => {
				return { ...prev, [fieldName]: value };
			});
		}
	};

	const handleCancel = () => {
		setNewCollection(initialCollection);
		setIsCreateNewCollectionOpen(false);
	};

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
			}}
			className={`${userPreferences.border} w-[280px] xs:w-[300px] ss:w-[360px] lg:w-[400px] h-[460px] px-5 py-8 outline-none cursor-pointer`}
		>
			<div className='flex flex-col justify-between w-full h-full gap-3'>
				<h1 className='text-xl'>Create new collection</h1>

				<form
					onSubmit={(e) => e.preventDefault()}
					className='flex flex-col gap-4'
				>
					<div className='flex flex-col gap-1'>
						<label htmlFor='collection' className='text-base'>
							Collection name
						</label>
						<input
							type='text'
							style={{
								backgroundColor: userPreferences.shade.card,
							}}
							required
							name='collectionName'
							value={newCollection?.title}
							className={`${userPreferences.border} bg-transparent text-sm w-full p-3 focus:outline-none `}
							onChange={(e) => handleChange("title", e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='description' className='text-base'>
							Description
						</label>
						<textarea
							style={{
								backgroundColor: userPreferences.shade.card,
							}}
							name='description'
							value={newCollection?.description}
							className={`${userPreferences.border} bg-transparent text-sm w-full p-3 focus:outline-none h-24`}
							onChange={(e) => handleChange("description", e.target.value)}
						/>
					</div>
				</form>

				<div>
					<h2 className='text-base'>Collection color</h2>
					<div className='flex justify-between px-2 mt-4'>
						{collectionColors.map((color, index) => (
							<label
								key={index}
								className='relative flex justify-center items-center cursor-pointer hover:scale-[1.1] transition-all duration-200 ease'
							>
								<input
									type='radio'
									value={color}
									className=' bg-white accent-color'
									checked={newCollection?.color === color}
									onChange={() => handleChange("color", color)}
								/>
								<span
									style={{
										borderColor: color,
										backgroundColor:
											newCollection?.color === color ? "transparent" : color,
									}}
									className={`  w-7 h-7 rounded-full absolute border-[3px] transition-colors duration-100 ease`}
								></span>
								<span
									style={{ backgroundColor: color }}
									className='w-3 h-3 rounded-full bg-white absolute'
								>
									{" "}
								</span>
							</label>
						))}
					</div>
				</div>

				<div className='flex gap-4 justify-end self-end'>
					<button
						onClick={handleCancel}
						style={{
							color: userPreferences.shade.text.secondaryText,
						}}
						className={`${userPreferences.border} flex items-center gap-2 py-2 px-4 cursor-pointer hover:opacity-60 outline-none`}
					>
						<span className='text-sm'>Cancel</span>
					</button>
					<button
						onClick={
							isUpdating ? handleUpdateCollection : handleCreateCollection
						}
						style={{
							backgroundColor: userPreferences.color,
							color: `${userPreferences.isLightMode ? "white" : "black"}`,
						}}
						className={`${userPreferences.border} flex items-center text-sm justify-center gap-2 py-2 px-4 cursor-pointer hover:opacity-60 outline-none h-10 w-24 `}
					>
						{isSubmitting ? (
							<ClipLoader loading={true} color={"#FFFFFF"} size={28} />
						) : isUpdating ? (
							"Update"
						) : (
							"Create"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateFolderModal;
