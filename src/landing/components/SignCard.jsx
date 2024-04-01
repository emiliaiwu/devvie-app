import { styles } from "../../style/reusableStyles";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";

const SignCard = ({ children }) => {
	const { container, flexCenter } = styles;
	const location = useLocation();

	let linkText, linkUrl;

	if (location.pathname === "/forgot-password") {
		linkText = "Sign Up";
		linkUrl = "/signup";
	} else if (location.pathname === "/signin") {
		linkText = "Sign Up";
		linkUrl = "/signup";
	} else if (location.pathname === "/reset-password") {
		linkText = "Sign In";
		linkUrl = "/signin";
	} else {
		linkText = "Sign In";
		linkUrl = "/signin";
	}

	return (
		<section className={`${container} bg-black min-h-screen`}>
			<div className={`${flexCenter} `}>
				<div className=' my-10 py-10 w-full max-w-[450px]'>
					<div className='sign-box relative w-full'>
						<div className=' bg-white rounded-[40px] w-full'>{children}</div>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 100 100'
							className='absolute right-[160px] top-0 w-[30px] rotate-90'
						>
							<path
								d='m100,0H0v100C0,44.77,44.77,0,100,0Z'
								fill='#000000'
							></path>
						</svg>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 100 100'
							className='absolute right-0 top-[84px] w-[30px] rotate-90'
						>
							<path
								d='m100,0H0v100C0,44.77,44.77,0,100,0Z'
								fill='#000000'
							></path>
						</svg>
						<div className='bg-black p-5 absolute right-0 top-0 rounded-bl-[40px] w-40 '>
							<Button
								url={linkUrl}
								text={linkText}
								className={" text-black bg-landingPrimary block py-10"}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignCard;
