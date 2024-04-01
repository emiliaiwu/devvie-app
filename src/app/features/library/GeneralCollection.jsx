import { useContext } from "react";
import { LibraryContext, UserPreferencesContext } from "../../context";
import CreateFolder from "./CreateFolder";
import FolderCard from "./FolderCard";
import { AddIcon } from "../../data/icon";
import { Link } from "react-router-dom";
import { HoverAccentColor, NoData } from "../../components";
import { noFiles } from "../../../assets";

const GeneralCollection = () => {
	const { userCollection } = useContext(LibraryContext);
	const { userPreferences } = useContext(UserPreferencesContext);
	const { setIsCreateNewCollectionOpen } = useContext(LibraryContext);
	return (
		<>
			<div className='flex justify-between items-center mb-6 px-2'>
				<div>
					<Link to={`/user/devmark`} className='text-base'>
						<HoverAccentColor>Home</HoverAccentColor>
					</Link>
				</div>

				<div className=''>
					<button
						onClick={() => setIsCreateNewCollectionOpen(true)}
						style={{
							backgroundColor: userPreferences.color,
							color: `${userPreferences.isLightMode ? "white" : "black"}`,
						}}
						className={`${userPreferences.border} flex items-center gap-1 py-2 px-3 cursor-pointer hover:opacity-60 outline-none transition-all duration-150 ease `}
					>
						<AddIcon className='w-5 h-5' />
						<span className='text-sm'> new collection</span>
					</button>
				</div>
			</div>

			<div>
				{userCollection.length !== 0 ? (
					<div className={`${userPreferences.border} min-h-screen`}>
						<div className='grid xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-3  gap-6 items-center xxl:grid-cols-8 justify-center lg:justify-start'>
							{userCollection?.map((collection) => (
								<FolderCard key={collection.id} collection={collection} />
							))}
							<div className="hidden md:flex">
								<CreateFolder />
							</div>
						</div>
					</div>
				) : (
					<NoData
						title={"No Collections Yet!"}
						paragraph={"Click the new collection button to start collecting"}
					/>
				)}
			</div>
		</>
	);
};

export default GeneralCollection;
