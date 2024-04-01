import { useContext } from "react";
import { CreateFolderIcon } from "../../data/icon";
import { LibraryContext, UserPreferencesContext } from "../../context";

const CreateFolder = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { setIsCreateNewCollectionOpen } =
		useContext(LibraryContext);
	return (
    <button
      onClick={() => setIsCreateNewCollectionOpen(true)}
			style={{
				borderColor: userPreferences.shade.text.secondaryText,
			}}
			className={`${userPreferences.border} w-[200px] h-[130px] p-3 border-2 border-dotted outline-none cursor-pointer opacity-40 hover:opacity-100 transition-all duration-200 ease `}
		>
			<div className='flex flex-col items-left w-full h-full gap-2'>
				<div className='flex justify-between'>
					<CreateFolderIcon
						style={{
							color: userPreferences.shade.text.secondaryText,
						}}
						className='w-[55px] h-[55px]'
					/>
				</div>

				<h1
					style={{ color: userPreferences.shade.text.secondaryText }}
					className='text-sm overflow-hidden overflow-ellipsis whitespace-normal w-[130px] pl-1 line-clamp-2 text-left'
				>
					New collection
				</h1>
			</div>
		</button>
	);
};

export default CreateFolder;
