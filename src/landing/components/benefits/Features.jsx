import { styles } from "../../../style/reusableStyles";
import { features } from "../../data/db";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: (index) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1 * index,
		},
	}),
};

const Features = () => {
	const { boxWidth, flexCenter } = styles;





	return (
		<section
			id='features'
			className={`min-h-screen flex items-center justify-center bg-[#F0E7FF] w-full flex-col font-DMSans md:py-[100px] py-20 relative `}
		>
			<div className='py-3 px-8 bg-landingPrimary text-white absolute -top-8 left-1/2 transform -translate-x-1/2 -rotate-6 rounded-3xl text-lg font-semibold'>
				What Devvie offers
			</div>
			<div
				className={`${boxWidth} ${flexCenter} w-full h-full relative lg:mb-20 text-black flex flex-col gap-16 max-w-[1440px]`}
			>
				<div className='w-full flex lg:flex-row flex-col justify-between items-center gap-4'>
					<h2 className='text-3xl lg:text-4xl xl:text-[40px] whitespace-normal xl:leading-[55px] font-semibold lg:max-w-[400px] sm:max-w-[500px]'>
						Unlock Your Full Potential with{" "}
						<span className='text-landingPrimary'>Devvie</span>
					</h2>
					<p className='whitespace-normal text-sm sm:text-base xl:leading-8 max-w-[500px] leading-6'>
						Devvie is not just a platform; it's your coding companion,
						empowering you to achieve more. Dive into a feature-rich environment
						tailored for aspiring developers like you.
					</p>
				</div>
				<ul className='grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 items-start gap-3'>
					{features.map((item, index) => (
						<motion.li
							key={index}
							variants={fadeInAnimationVariants}
							initial='initial'
							whileInView='animate'
							viewport={{ once: true }}
							custom={index}
							className='w-full md:max-w-[320px] p-5 bg-white rounded-2xl h-[300px]'
						>
							<div className='flex flex-col justify-between h-full w-full pb-4'>
								<div className='flex'>
									<div className='p-5 bg-[#F0E7FF] rounded-full'>
										{<item.icon className='w-6 h-6 text-landingPrimary' />}
									</div>
								</div>
								<div>
									<h3 className='text-lg tracking-tight font-semibold whitespace-normal mb-3'>
										{item.title}
									</h3>
									<p className='text-sm whitespace-normal leading-6'>
										{item.paragraph}
									</p>
								</div>
							</div>
						</motion.li>
					))}
				</ul>
			</div>{" "}
		</section>
	);
};

export default Features;
