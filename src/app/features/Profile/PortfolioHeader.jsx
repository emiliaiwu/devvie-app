import { Link } from "react-router-dom";
import { backupAvatar, backupCover } from "../../../assets";
import {
	Call,
	Download,
	Facebook,
	Github,
	Gmail,
	Instagram,
	Linkedin,
} from "../../data/icon";
import React from "react";
import { HoverAccentColor } from "../../components";

const PortfolioHeader = ({ userPreferences, userProfile }) => {
	const socialIcons = {
		facebook: Facebook,
		github: Github,
		gmail: Gmail,
		instagram: Instagram,
		linkedin: Linkedin,
	};
	return (
		<div
			className={`flex flex-col justify-center items-center relative w-full overflow-hidden mb-10`}
		>
			<div className='w-full'>
				{userProfile?.coverPhoto === null ? (
					<div className={`overflow-hidden`}>
						<img
							src={backupCover}
							className='w-full lg:h-[200px] h-[120px] object-cover'
						/>
					</div>
				) : (
					<div className={`overflow-hidden`}>
						<img
							src={userProfile.coverPhoto}
							className='w-full h-[120px] lg:h-[200px] object-cover'
						/>
					</div>
				)}
			</div>
			<div
				style={{ backgroundColor: userPreferences.shade.background }}
				className=' h-full max-w-[1440px] pb-14 pt-4 flex flex-col justify-center items-center w-full'
			>
				<div
					style={{ left: "50%", transform: "translateX(-50%)" }}
					className='border-[3px] rounded-full bg-transparent lg:p-[7px] p-1 absolute lg:top-[100px] top-[70px]'
				>
					<div className='rounded-full overflow-hidden '>
						<img
							src={userProfile?.userPhoto || backupAvatar}
							className={`${
								backupAvatar && "object-cover bg-white"
							}  lg:w-[150px] lg:h-[150px] w-[80px] h-[80px] object-contain`}
						/>
					</div>
				</div>

				<div className='relative w-full'>
					<div className=' px-6 lg:px-14 flex flex-col justify-center items-center gap-2 text-center lg:mt-[80px] mt-[60px]'>
						<h1 className='lg:text-3xl text-2xl font-semibold'>
							{userProfile.firstName} {userProfile.lastName}
						</h1>
						<p
							className='lg:text-base text-sm'
							style={{ color: userPreferences.shade.text.secondaryText }}
						>
							{userProfile.location}
						</p>
						{userProfile.jobTitle && userProfile.employmentType && (
							<p className='lg:text-lg text-base flex flex-row gap-3 items-center text-center'>
								<span style={{ color: userPreferences.color }}>
									{userProfile.jobTitle}
								</span>
								<span className='text-xl font-bold'>&middot;</span>
								<span
									style={{ color: userPreferences.shade.text.secondaryText }}
								>
									{userProfile.employmentType}
								</span>
							</p>
						)}

						<div
							style={{ "--hover-color": userPreferences.color }}
							className='flex items-center gap-5 mt-2 '
						>
							{userProfile.hireMe && (
								<div
									style={{ "--hove-color": userPreferences.color }}
									className='flex flex-row gap-3 items-center'
								>
									<div
										style={{ backgroundColor: userPreferences.color }}
										className='w-3 h-3 rounded-full circle pulse'
									></div>
									<h2 className='lg:text-base text-sm'>Available for work</h2>
								</div>
							)}
						</div>
					</div>

					<div className='md:absolute lg:right-14 right-8 top-4 flex sm:flex-row-reverse justify-center items-center xl:gap-10 gap-5 flex-col-reverse mt-4 md:mt-0'>
						{userProfile?.socials &&
							Object.keys(userProfile.socials).length > 0 && (
								<ul className='flex gap-4'>
									{Object.entries(userProfile.socials).map(
										([social, link]) =>
											link && (
												<li
													style={{
														borderColor:
															userPreferences.shade.text.secondaryText,
													}}
													key={social}
													className={`${userPreferences.border} lg:p-3 p-2 border flex justify-center items-center`}
												>
													<HoverAccentColor>
														<Link to={link}>
															{socialIcons[social.toLowerCase()] &&
																React.createElement(
																	socialIcons[social.toLowerCase()],
																	{ style: { width: "20px", height: "20px" } }
																)}
														</Link>
													</HoverAccentColor>
												</li>
											)
									)}
								</ul>
							)}
						{userProfile.remotely && (
							<div
								style={{ "--hove-color": userPreferences.color }}
								className='flex flex-row gap-3 items-center'
							>
								<div
									style={{
										backgroundColor: userPreferences.color,
									}}
									className='w-3 h-3 rounded-full circle pulse'
								></div>
								<h2 className='lg:text-base text-sm'>Remotely</h2>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PortfolioHeader;
