import { ctaImg, img2, img5, } from "../../../assets";
import { styles } from "../../../style/reusableStyles";
import { ButtonBig } from "../Button";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

const Cta = () => {
	const { boxWidth, flexCenter } = styles;
const imageRef = useRef(null);
const { scrollYProgress } = useScroll({
	target: imageRef,
	offset: ["0 1", "1.33 1"],
});

const scaleProgress = useTransform(scrollYProgress, [0, 0.6], ["50%", "100%"]);
const opacityProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

	return (
		<section
			id='cta'
			className={`min-h-screen relative flex items-center justify-center bg-white w-full flex-col font-DMSans py-[120px]`}
		>
			<motion.div
				ref={imageRef}
				style={{
					scale: scaleProgress,
					opacity: opacityProgress,
				}}
				className={`${boxWidth} ${flexCenter} w-full h-full relative lg:mb-20 text-black flex flex-col gap-[120px]`}
			>
				<div className='bg-landingPrimary lg:h-[600px] max-w-[1440px] md:rounded-[50px] rounded-3xl flex lg:flex-row flex-col items-center xxl:p-28 xl:p-20 px-6 py-10 xs:p-8 sm:p-10 md:p-20 lg:p-16 lg:justify-between justify-center w-full gap-20'>
					<div className='lg:w-1/2 flex flex-col gap-8 md:gap-10'>
						<h1 className=' text-white text-3xl lg:text-4xl xl:text-[40px] whitespace-normal xl:leading-[50px] font-semibold w-full '>
							Ready to elevate <br /> your coding skills?
						</h1>
						<p className='whitespace-normal text-sm md:text-base xl:text-lg max-w-[450px] text-whiteOff leading-6'>
							Empower your coding journey with our all-in-one portfolio project
							manager. Gain insights into your coding habits, and elevate your
							skills.
						</p>

						<div className='flex'>
							<ButtonBig
								url={"signup"}
								text={"Get Started for Free"}
								className={" text-landingPrimary bg-[#F0E7FF] block px-8"}
							/>
						</div>
					</div>
					<div className=' lg:w-1/2 flex justify-end '>
						<div className='w-full rounded-lg md:rounded-3xl backdrop border border-white p-2 max-w-[500px] relative'>
							<img
								src={ctaImg}
								loading='lazy'
								className='w-full h-full rounded-lg md:rounded-3xl border-4 border-white'
							/>

							<div className='w-[100px] h-[100px] rounded-full overflow-hidden absolute -bottom-6 -right-10 hidden lg:flex float-lr'>
								<img src={img5} className='object-cover w-full h-full' />
							</div>

							<div className='w-[80px] h-[80px] rounded-3xl overflow-hidden absolute -top-10 left-[25%] hidden lg:flex float-ud'>
								<img src={img2} className='object-cover w-full h-full' />
							</div>
						</div>
					</div>
				</div>
			</motion.div>{" "}
		</section>
	);
};

export default Cta;
