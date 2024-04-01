import { Link, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LibraryContext, UserPreferencesContext } from "../../context";
import { AddIcon } from "../../data/icon";
import { HoverAccentColor, NoData } from "../../components";
import Bookmark from "./Bookmark";
import AddLinkModal from "./AddLinkModal";
import { usePreventBodyScroll } from "../../../hooks";
import { noFiles } from "../../../assets";
const CollectionPage = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { userCollection, isAddLinkOpen, setIsAddLinkOpen } =
		useContext(LibraryContext);

	const { slug } = useParams();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [slug]);

	const collection = userCollection?.find(
		(collection) => collection.slug === slug
	);

	usePreventBodyScroll(isAddLinkOpen);

	return (
		<>
			<div className='flex justify-between flex-col-reverse ss:flex-row gap-6 items-center mb-6 px-2'>
				<div className='flex gap-3'>
					<Link to={`/user/devmark`} className='text-base'>
						<HoverAccentColor>Home</HoverAccentColor>
					</Link>
					<span>{">"}</span>

					<Link className="whitespace-normal">
						<HoverAccentColor>{collection?.title}</HoverAccentColor>
					</Link>
				</div>
				{isAddLinkOpen && (
					<div
						className={`z-[1000] fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center pt-40 overflow-y-auto pb-20 `}
					>
						<div>
							<AddLinkModal collectionId={collection?.id} />
						</div>
					</div>
				)}
				<div>
					<button
						onClick={() => setIsAddLinkOpen(true)}
						style={{
							backgroundColor: userPreferences.color,
							color: `${userPreferences.isLightMode ? "white" : "black"}`,
						}}
						className={`${userPreferences.border} flex items-center gap-1 py-2 px-3 cursor-pointer hover:opacity-60 outline-none transition-all duration-150 ease`}
					>
						<AddIcon className='w-5 h-5' />
						<span className='text-sm'> new link</span>
					</button>
				</div>
			</div>

			<div>
				{collection.links.length !== 0 ? (
					<div className='grid md:grid-cols-3 xl:grid-cols-4 ss:grid-cols-2 gap-y-6 xxl:grid-cols-6 items-center mt-8 mx-auto gap-x-4'>
						{collection?.links.map((link) => (
							<Bookmark key={link.title} link={link} />
						))}
					</div>
				) : (
					<NoData
						title={"No Saved Links Yet!"}
						paragraph={"Click the new link button to start saving links"}
					/>
				)}
			</div>
		</>
	);
};

export default CollectionPage;
