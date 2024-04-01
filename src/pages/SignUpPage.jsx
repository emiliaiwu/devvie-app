import { SignContainer } from "../components";
import { SignUpForm } from "../components";
import { useScrollToTop } from "../hooks";

const SignUpPage = () => {
	useScrollToTop();
	return (
		<SignContainer
			welcomeText='Simplify your coding journey and achieve your goals faster.'
			paragraph='Devvie helps you track progress, build projects, manage time,
								increase productivity, collaborate and get job offers'
		>
			<SignUpForm />
		</SignContainer>
	);
};

export default SignUpPage;
