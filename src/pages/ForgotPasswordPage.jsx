import { styles } from "../style/reusableStyles";
import { ForgotPasswordForm } from "../components";
import { useScrollToTop } from "../hooks";

const SignInPage = () => {
	useScrollToTop();
	const { container, flexCenter } = styles;

	return (
		<section
			className={`${container} ${flexCenter} bg-offwhite ss:py-20 px-3 min-h-screen py-10`}
		>
			<div className='max-w-[500px] w-full flex justify-center items-center rounded-2xl p-3 backdrop border border-white'>
				<div className='w-full bg-white rounded-2xl lg:flex overflow-hidden gap-4'>
					<ForgotPasswordForm />
				</div>
			</div>
		</section>
	);
};

export default SignInPage;
