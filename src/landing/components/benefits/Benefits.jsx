import { styles } from "../../../style/reusableStyles";
import { benefits } from "../../data/db";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1,
		},
	},
};

const Benefits = () => {
	const { boxWidth, flexCenter } = styles;

	return (
		<section
			id='benefits'
			className={`min-h-screen relative flex items-center justify-center bg-white w-full flex-col font-DMSans md:py-[100px] py-16 xxl:pt-[200px]`}
		>
			<div className='py-3 px-8 bg-landingPrimary text-white absolute -top-8 left-1/2 transform rotate-6 -translate-x-1/2 rounded-3xl text-lg font-semibold'>
				Why Devvie?
			</div>

			<div
				className={`${boxWidth} ${flexCenter} w-full h-full relative lg:mb-20 text-black flex flex-col gap-16`}
			>
				<div className='w-full flex lg:flex-row flex-col justify-start lg:justify-between items-center max-w-[1440px] gap-6'>
					<h2 className='text-3xl sm:text-3xl lg:text-4xl xl:text-[40px] whitespace-normal xl:leading-[55px] font-semibold max-w-[500px] lg:leading-[48px] xs:pr-10'>
						A platform designed for growth and success
					</h2>
					<p className='whitespace-normal text-sm sm:text-base xl:leading-8 xl:max-w-[500px] lg:max-w-[400px] max-w-[500px] leading-6'>
						Don't just dream of becoming a skilled developer – make it a reality
						with <span className='font-semibold'>Devvie.</span> Take full
						control of your coding journey, effortlessly build, organize, and
						track your projects to enhance your skills.
					</p>
				</div>
				<div
					className={`w-full h-full text-black flex flex-col justify-center items-center gap-20 md:gap-[120px]`}
				>
					{benefits.map((item, index) => (
						<section
							key={index}
							className={`flex w-full max-w-[1440px] lg:justify-center xxl:justify-between xl:gap-32 gap-12 items-center 
						}  ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} flex-col`}
						>
							<motion.div
								variants={fadeInAnimationVariants}
								initial='initial'
								whileInView='animate'
								viewport={{ once: true }}
								style={{
									backgroundColor: `${item.background}`,
								}}
								className='sm:px-10 sm:py-20 md:py-10  p-5 max-w-[600px]  w-full flex justify-center items-center rounded-3xl  lg:w-2/3'
							>
								<div className='max-w-[580px] w-full flex justify-center items-center rounded-2xl backdrop border border-white p-4 shadow-2xl relative '>
									<div
										className='relative max-w-[500px] w-full'
										style={{ paddingBottom: "80.000%" }}
									>
										<iframe
											src={`${item.url}`}
											width='100%'
											height='100%'
											allowFullScreen
											allow='autoplay'
											className='absolute left-0 top-0 w-full h-full'
											style={{ overflow: "hidden" }}
										></iframe>
									</div>
								</div>
							</motion.div>
							<div className='lg:w-1/2 w-full max-w-[500px] flex flex-col gap-4 md:gap-6'>
								<div>
									<div
										style={{
											backgroundColor: `${item.background}`,
											color: `${item.color}`,
										}}
										className='text-sm sm:text-base xl:text-lg xl:leading-8 font-semibold py-3 px-5 rounded-full  inline'
									>
										{item.accent}
									</div>{" "}
								</div>
								<h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] whitespace-normal xl:leading-[50px] font-semibold max-w-[400px] mt-4'>
									{item.title}
								</h2>
								<p className='whitespace-normal text-sm sm:text-base xl:text-lg xl:leading-8 leading-6'>
									{item.paragraph}
								</p>
							</div>
						</section>
					))}
				</div>{" "}
			</div>
		</section>
	);
};

export default Benefits;
