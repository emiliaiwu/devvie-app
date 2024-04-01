import { useContext } from "react";
import { LibraryContext, UserPreferencesContext } from "../../context";
import Banner from "./Banner";
import CreateFolderModal from "./createFolderModal";
import { usePreventBodyScroll, useScrollToTop } from "../../../hooks";
import { Outlet } from "react-router-dom";

const Library = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { isCreateNewCollectionOpen, isAddLinkOpen } =
		useContext(LibraryContext);
	useScrollToTop();

	usePreventBodyScroll(isCreateNewCollectionOpen || isAddLinkOpen);

	return (
		<section
			style={{
				backgroundColor: userPreferences.shade.card,
				fontFamily: userPreferences.font.fontFamily,
				color: userPreferences.shade.text.primaryText,
			}}
			className=' lg:pl-20 min-h-screen md:mt-0 mx-auto relative overflow-x-hidden w-full '
		>
			<div className='lg:py-24 lg:pl-8 lg:pr-10 px-6 flex flex-col gap-10 min-h-screen py-20'>
				{isCreateNewCollectionOpen && (
					<div
						className={`z-[1000] fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center pt-40 overflow-y-auto pb-20 `}
					>
						<div>
							<CreateFolderModal />
						</div>
					</div>
				)}
				<Banner />

				<div>
					<Outlet />
				</div>
			</div>
		</section>
	);
};

export default Library;
