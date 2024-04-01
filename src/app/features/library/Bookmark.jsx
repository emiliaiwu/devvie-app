import { useContext } from "react";
import { LibraryContext, UserPreferencesContext } from "../../context";
import { BookmarkIcon, DeleteIcon, GoToLinkIcon } from "../../data/icon";
import Tag from "./Tag";
import { HoverAccentColor } from "../../components";
import { Link } from "react-router-dom";

const Bookmark = ({ link }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { deleteLink } = useContext(LibraryContext);

	return (
		<div className=''>
			<div
				style={{
					backgroundColor: userPreferences.shade.background,
				}}
				className={`${userPreferences.border} lg:w-[262px] md:w-[230px] w-full  flex gap-3 p-4 items-center relative`}
			>
				<div className='flex flex-col justify-between gap-2 w-full'>
					<div className='flex flex-row gap-3 items-center'>
						{link.tag.map((tag) => (
							<Tag key={tag.title} title={tag.title} color={tag.color} />
						))}
					</div>

					<h1 className='text-base line-clamp-2 whitespace-normal w-[200px] truncate'>
						{link?.title}
					</h1>
					<div
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='text-xs flex justify-between items-center mt-1'
					>
						{link.createdAt ? (
							<span>{link.createdAt.toLocaleString()}</span>
						) : (
							<span></span>
						)}
						<div className='flex items-center gap-3'>
							<Link
								to={`${link?.link}`}
								target='_blank'
								className='cursor-pointer'
							>
								<HoverAccentColor>
									<GoToLinkIcon className='w-4 h-4' />
								</HoverAccentColor>
							</Link>
							<span
								onClick={() => deleteLink(link?.collectionId, link?.id)}
								className='cursor-pointer'
							>
								<HoverAccentColor>
									<DeleteIcon className='w-4 h-4' />
								</HoverAccentColor>
							</span>
						</div>
					</div>
				</div>
				<div className='absolute right-6 -top-1'>
					<BookmarkIcon
						style={{ color: userPreferences.shade.text.secondaryText }}
						className='w-6 h-6'
					/>
				</div>
			</div>
		</div>
	);
};

export default Bookmark;
