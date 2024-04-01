import { useContext } from "react";
import { DeleteIcon, EditCircleIcon, FolderIcon } from "../../data/icon";
import { LibraryContext, UserPreferencesContext } from "../../context";
import { Link } from "react-router-dom";
import { HoverAccentColor } from "../../components";

const FolderCard = ({ collection }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { deleteCollection, editCollection } = useContext(LibraryContext);

	return (
		<Link to={`${collection?.slug}`}>
			<div
				style={{
					backgroundColor: userPreferences.shade.background,
				}}
				className={`${userPreferences.border} xs:w-[160px] ss:w-[200px] sm:w-[180px] md:w-[200px] h-[130px] p-3 flex justify-center items-center cursor-pointer`}
			>
				<div className='flex flex-col items-left w-full h-full gap-2'>
					<div className='flex justify-between'>
						<FolderIcon
							style={{ color: `${collection?.color}` }}
							className='w-[55px] h-[55px]'
						/>
						<div
							style={{ color: userPreferences.shade.text.secondaryText }}
							className='self-start flex flex-col gap-3 items-center pt-1'
						>
							<span onClick={() => editCollection(collection)}>
								<HoverAccentColor>
									<EditCircleIcon className='w-4 h-4' />
								</HoverAccentColor>
							</span>
							<span onClick={() => deleteCollection(collection?.id)}>
								<HoverAccentColor>
									<DeleteIcon className='w-4 h-4' />
								</HoverAccentColor>
							</span>
						</div>
					</div>

					<h1
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-sm overflow-hidden overflow-ellipsis whitespace-normal w-[130px] pl-1 line-clamp-2'
					>
						{collection?.title}
					</h1>
				</div>
			</div>
		</Link>
	);
};

export default FolderCard;
