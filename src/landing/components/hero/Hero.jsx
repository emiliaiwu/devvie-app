import { styles } from "../../../style/reusableStyles";
import { ButtonBig } from "../Button";
import DynamicText from "./DynamicText";
import HeroImages from "./HeroImages";

import DevvieBoard from "./DevvieBoard";

const Hero = () => {
	const { boxWidth, flexCenter } = styles;

	return (
		<section
			className={`min-h-screen flex items-center justify-center bg-whiteOff w-full flex-col pt-[100px] md:py-[150px] xxl:pt-[200px] pb-[150px] `}
		>
			<div
				className={`${boxWidth} ${flexCenter} w-full h-full relative lg:mb-20 `}
			>
				<div className='hidden md:flex'>
					<HeroImages />
				</div>

				<div className='flex flex-col justify-between items-center lg-gap-10 md:gap-12 gap-6 w-full'>
					<div>
						<p className='bg-black text-white font-semibold tracking-tighter font-DMSans sm:text-base text-sm text-center inline-block sm:py-3 py-2 sm:px-8 px-4 rounded-full'>
							Your tech journey starts here! 🎉
						</p>
					</div>
					<div>
						<h1 className='text-black w-[320px] whitespace-break-spaces font-DMSans text-[45px] leading-[54px] sm:text-[50px] text-center sm:leading-[60px] font-[800] sm:w-[70vw] md:text-[55px] lg:text-[65px] xl:text-[80px] xxl:text-[90px] md:leading-[70px] xl:w-[1000px] tracking-tight xl:leading-[100px] overflow-hidden xxl:leading-[120px]'>
							The Best Tool for Aspiring
							<DynamicText />
							Developers
						</h1>
					</div>
					<div className='mb-5'>
						<p className='text-landingGreyText text-sm text-center leading-6 w-full md:w-[60vw]  whitespace-break-spaces lg:w-[650px] md:text-base md:leading-7 lg:text-lg lg:leading-8 xl:text-xl xl:leading-9 ss:w-[350px]'>
							Build, track and manage your personal projects. Save relevant
							links, publish portfolio and stay productive while learning to
							code.
						</p>
					</div>
					<div className=''>
						<ButtonBig
							url={"signup"}
							text={"Build Your First Project"}
							className={" text-white bg-landingPrimary block px-8"}
						/>
					</div>
				</div>
			</div>

			<DevvieBoard />
		</section>
	);
};

export default Hero;
