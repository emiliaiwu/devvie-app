import { SignContainer } from "../components";
import { SignInForm } from "../components";
import { useScrollToTop } from "../hooks";

const SignInPage = () => {
	useScrollToTop();
	return (
		<SignContainer
			welcomeText={"Welcome back to your coding journey! Your projects await."}
			paragraph={
				"Continue building projects, tracking your progress, collaborating, and connecting with fellow aspiring developers."
			}
		>
			<SignInForm />
		</SignContainer>
	);
};

export default SignInPage;
