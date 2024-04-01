import { useContext, useState } from "react";
import { LibraryContext, UserPreferencesContext } from "../../context";
import { linkTags } from "../../data/projectData";
import Tag from "./Tag";
import { DropdownArrowIcon } from "../../data/icon";
import { HoverAccentColor } from "../../components";
import { ClipLoader } from "react-spinners";

const AddLinkModal = ({ collectionId }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const {
		newLink,
		setNewLink,
		initialLink,
		setIsAddLinkOpen,
		addLink,
		isSubmitting,
	} = useContext(LibraryContext);
	const [isLinkOpen, setIsLinkOpen] = useState(false);

	const handleChange = (fieldName, value) => {
		if (fieldName in newLink) {
			setNewLink((prev) => {
				return { ...prev, [fieldName]: value };
			});
		}

		setIsLinkOpen(false);
	};

	const handleTag = (item) => {
		if (newLink.tag.length < 2) {
			setNewLink((prev) => {
				return { ...prev, tag: [...prev.tag, item] };
			});

		} else {
			setIsLinkOpen(false);
			return;
		}

		
	};

	const handleCancel = () => {
		setNewLink(initialLink);
		setIsAddLinkOpen(false);
	};

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.background,
			}}
			className={`${userPreferences.border} w-[280px] xs:w-[300px] ss:w-[350px] lg:w-[400px] px-3  py-6 h-[450px] flex flex-col justify-between`}
		>
			<h1 className='text-xl px-2'>Add Link</h1>
			<div className='overflow-y-scroll scroll px-2'>
				<form className='flex flex-col gap-4 mb-4'>
					<label className='flex flex-col gap-1'>
						Title
						<input
							style={{
								backgroundColor: userPreferences.shade.card,
								color: userPreferences.shade.text.primaryText,
							}}
							type='text'
							name='title'
							value={newLink?.title}
							onChange={(e) => handleChange("title", e.target.value)}
							className={`${userPreferences.border} bg-transparent text-sm w-full p-3 focus:outline-none `}
						/>
					</label>

					<label className='flex flex-col gap-1'>
						Link
						<input
							style={{
								backgroundColor: userPreferences.shade.card,
								color: userPreferences.shade.text.primaryText,
							}}
							type='url'
							name='link'
							value={newLink?.link}
							pattern='https?://.+'
							required
							onChange={(e) => handleChange("link", e.target.value)}
							className={`${userPreferences.border} bg-transparent text-sm w-full p-3 focus:outline-none `}
						/>
					</label>
				</form>
				<div className='relative  '>
					<div className=''>
						<div className='flex flex-col gap-1 mb-4'>
							Tag
							<div
								style={{
									backgroundColor: userPreferences.shade.card,
								}}
								className={`${userPreferences.border} bg-transparent text-sm w-full p-3 focus:outline-none h-12  flex justify-between items-center`}
							>
								<div className='flex flex-row gap-3 items-center'>
									{" "}
									{newLink.tag
										? newLink.tag.map((tag) => (
												<Tag
													key={tag.title}
													title={tag.title}
													color={tag.color}
												/>
										  ))
										: "Choose tag"}
								</div>
								<div
									onClick={() => setIsLinkOpen(!isLinkOpen)}
									className='cursor-pointer'
								>
									<HoverAccentColor>
										<DropdownArrowIcon
											style={{
												transform: `rotate(${isLinkOpen ? "180deg" : "0deg"})`,
											}}
											className='w-6 h-6'
										/>
									</HoverAccentColor>
								</div>
							</div>
						</div>
					</div>
					<div className='overflow'>
						{isLinkOpen && (
							<ul
								style={{
									backgroundColor: userPreferences.shade.card,
								}}
								className={`${userPreferences.border}  flex flex-col gap-3 p-4 absolute w-full`}
							>
								{linkTags.map((item) => (
									<li
										onClick={() => handleTag(item)}
										key={item.title}
										className='cursor-pointer'
									>
										<Tag title={item.title} color={item.color} />
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>

			<div className='flex gap-4 justify-end self-end justify-self-end'>
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
					onClick={() => addLink(collectionId)}
					style={{
						backgroundColor: userPreferences.color,
						color: `${userPreferences.isLightMode ? "white" : "black"}`,
					}}
					className={`${userPreferences.border} flex text-sm items-center gap-2 py-2 px-4 cursor-pointer hover:opacity-60 outline-none justify-center h-10 w-24`}
				>
					{isSubmitting ? (
						<ClipLoader loading={true} color={"#FFFFFF"} size={28} />
					) : (
						"Save Link"
					)}
				</button>
			</div>
		</div>
	);
};

export default AddLinkModal;
