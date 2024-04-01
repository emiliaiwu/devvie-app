import AccentColor from "./AccentColor";
import BorderRadius from "./BorderRadius";
import FontStyle from "./FontStyle";
import LightDarkMode from "./LightDarkMode";
import { UserPreferencesContext } from "../../context";
import { useContext, useEffect } from "react";
import { OutlineButton, ColoredButton } from "../../components/Button";
import { ClipLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { useScrollToTop } from "../../../hooks";


const Theme = () => {
	useScrollToTop();
	const {
		handleSavePreferences,
		handleResetPreferences,
		handleCancelPreferences,
		newUserPreferences,
		isUpdating,
		isUpdated,
		setIsUpdated,
		isReseting,
	} = useContext(UserPreferencesContext);

	const location = useLocation();

	useEffect(() => {
		setIsUpdated(false);
		handleCancelPreferences();
	}, [location.pathname]);

	return (
		<section
			style={{ backgroundColor: newUserPreferences.shade.card }}
			className={` lg:pl-20 min-h-screen lg:mt-0 mx-auto`}
		>
			<div className='lg:py-28 lg:pl-8 lg:pr-10 px-6 flex flex-col gap-8 min-h-screen py-20'>
				<h2
					style={{
						fontFamily: newUserPreferences.font.fontFamily,
						color: newUserPreferences.shade.text.primaryText,
					}}
					className='text-2xl md:text-3xl font-medium px-2 pt-5'
				>
					Appearance
				</h2>

				<div className=' flex flex-col items-center lg:items-start gap-8 mb-5 lg:px-2'>
					<div className='w-full'>
						<h3
							style={{
								fontFamily: newUserPreferences.font.fontFamily,
								color: newUserPreferences.shade.text.primaryText,
							}}
							className='text-lg mb-5 font-medium text-center sm:text-left'
						>
							Choose your preferred mode
						</h3>

						<LightDarkMode />
					</div>
					
					<div className='w-full'>
						<h3
							style={{
								fontFamily: newUserPreferences.font.fontFamily,
								color: newUserPreferences.shade.text.primaryText,
							}}
							className='text-lg font-medium'
						>
							Choose your accent color
						</h3>
						<AccentColor />
					</div>

					<div className='mb-2 w-full'>
						<h3
							style={{
								fontFamily: newUserPreferences.font.fontFamily,
								color: newUserPreferences.shade.text.primaryText,
							}}
							className='text-lg mb-5 font-medium'
						>
							Choose your border style
						</h3>
						<BorderRadius />
					</div>
					<div className='w-full'>
						<h3
							style={{
								fontFamily: newUserPreferences.font.fontFamily,
								color: newUserPreferences.shade.text.primaryText,
							}}
							className='text-lg mb-5 font-medium'
						>
							Choose your preferred font
						</h3>
						<FontStyle />
					</div>
				</div>
				<div className='flex flex-col-reverse sm:flex-row gap-8 items-center justify-between lg:mt-20 mt-10 py-4 px-2'>
					<div>
						<button
							onClick={handleResetPreferences}
							className='flex justify-center items-center'
						>
							<OutlineButton
								border={newUserPreferences.border}
								font={newUserPreferences.font.fontFamily}
								color={newUserPreferences.color}
								textColor={newUserPreferences.shade.text.primaryText}
							>
								{isReseting ? (
									<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
								) : (
									<span>Reset to default</span>
								)}
							</OutlineButton>
						</button>
					</div>

					<div className='flex flex-row items-center gap-10 mb-5 sm:mb-0'>
						<button
							onClick={handleCancelPreferences}
							style={{
								fontFamily: newUserPreferences.font.fontFamily,
								color: newUserPreferences.shade.text.primaryText,
							}}
							className='font-medium hover:opacity-50 transition-all duration-200 ease py-[10px] px-3'
						>
							Cancel
						</button>{" "}
						<button
							onClick={handleSavePreferences}
							className='flex justify-center items-center'
						>
							<ColoredButton
								border={newUserPreferences.border}
								font={newUserPreferences.font.fontFamily}
								color={newUserPreferences.color}
								fontColor={newUserPreferences.isLightMode ? 'white' : 'black'}
							>
								{isUpdating ? (
									<ClipLoader loading={true} color={"#FFFFFF"} size={32} />
								) : (
									<span>{isUpdated ? "Changes saved" : "Save changes"}</span>
								)}
							</ColoredButton>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Theme;
