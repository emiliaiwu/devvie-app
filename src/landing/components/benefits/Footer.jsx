import { Link } from "react-router-dom";
import { emilia } from "../../../assets";
import { styles } from "../../../style/reusableStyles";
import { myLinks } from "../../data/db";

const Footer = () => {
	const { boxWidth, flexCenter } = styles;

	return (
		<footer
			id='footer'
			className={`relative flex items-center justify-center bg-[#F0E7FF]  w-full flex-col font-DMSans `}
		>
			<div
				className={`${boxWidth} ${flexCenter} w-full h-full text-black flex flex-col md:gap-16 gap-10 max-w-[1440px]`}
			>
				<div className='md:w-[170px] md:h-[170px] w-[130px] h-[130px] rounded-full overflow-hidden absolute -top-12 bg-white p-1 lg:left-16 left-6'>
					<img
						loading='lazy'
						alt="Emilia's Picture"
						src={emilia}
						className='w-full h-full object-cover rounded-full'
					/>
				</div>

				<div className='flex md:flex-row flex-col justify-between w-full lg:pl-[190px] pt-12 md:pt-24 lg:pt-0 gap-3'>
					<div className='flex flex-col justify-between h-full'>
						<h1 className='text-3xl font-bold tracking-tight '>Emilia Iwu</h1>
						<p className='text-base flex items-center gap-2'>
							Frontend Developer{" "}
							<span className='text-3xl font-bold'>&middot;</span> Nigeria.
						</p>
						<p className='text-base whitespace-normal' >
							Devvie was designed and developed by me.
						</p>
					</div>

					<ul className='flex items-center gap-4'>
						{myLinks.map((item, index) => (
							<li
								key={index}
								className='w-9 h-9 border border-black rounded-xl flex justify-center items-center hover:border-landingPrimary group hover:landingPrimary cursor-pointer transition-all duration-150 ease'
							>
								<Link to={`${item.url}`} target='_blank'>
									<span>
										{
											<item.icon className='w-4 h-4 text-black group-hover:text-landingPrimary' />
										}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div
					style={{ "--hove-color": "#A327F0" }}
					className='flex md:flex-row-reverse lg:justify-between flex-col gap-8 w-full justify-center'
				>
					<div className='flex items-center gap-3 lg:pl-10 '>
						<div className='w-3 h-3 rounded-full circle pulse bg-landingPrimary'></div>
						<div className='text-base inline border  text-landingPrimary'>
							Available for work
						</div>
					</div>
					<p className='text-base w-full '>
						&copy; 2024{" "}
						<Link
							to='https://emiliaiwuc.com'
							target='_blank'
							className='text-landingPrimary font-semibold tracking-tight hover:text-landingGrey  transition-all duration-150 ease'
						>
							Emilia Iwu C.
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
