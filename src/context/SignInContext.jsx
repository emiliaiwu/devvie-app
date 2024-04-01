import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { authErrors } from "../firebase";

const SignInContext = createContext();

export const SignInContextProvider = ({ children }) => {
	const {
		signIn,
		googleSignIn,
		forgotPassword,
		signOutUser,
		githubSignIn,
		user,
	} = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [agreeToTerms, setAgreeToTerms] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);


	// handle email change
	const handleEmailChange = (newEmail) => {
		setEmail(newEmail);
		setEmailErr("");
		setPasswordErr("");
		setError("");
	};

	// handle password change
	const handlePasswordChange = (newPassword) => {
		setPassword(newPassword);
		setPasswordErr("");
		setError("");
	};

	// SignIn function
	const handleSignIn = async (e, navigate) => {
		e.preventDefault();
		setError("");
		setEmailErr("");
		setPasswordErr("");
		setIsPasswordVisible(false);
		setIsSubmitting(true);

		try {
			await signIn(email, password, rememberMe);
			setIsSubmitting(false);
			navigate("/user/dashboard");
		} catch (err) {
			// Handle authentication errors
			setIsSubmitting(false);
			const errorCode = err.code;
			let errorMessage = err.message;

			if (errorCode.includes("password")) {
				errorMessage = authErrors[errorCode];
				setPasswordErr(errorMessage);
			} else if (errorCode.includes("user") || errorCode.includes("email")) {
				errorMessage = authErrors[errorCode];
				setEmailErr(errorMessage);
			} else {
				setError(errorMessage);
			}
		}
	};

	// handle Forgot Password
	const handleForgotPassword = async (e) => {
		e.preventDefault();
		setError("");
		setIsSubmitting(true);

		try {
			await forgotPassword(email);
			setIsSubmitting(false);
			setResetPasswordEmailSent(true);
		} catch (err) {
			setIsSubmitting(false);
			const errorCode = err.code;
			let errorMessage = authErrors[errorCode];
			setError(errorMessage);
		}
	};

	// Google sign
	const handleGoogleSignIn = async (e, navigate) => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate("/user/dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	// Google sign
	const handleGithubSignIn = async (e, navigate) => {
		e.preventDefault();
		try {
			await githubSignIn();
			navigate("/user/dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	// logout function:
	const handleSignOut = async () => {
		setError("");
		try {
			await signOutUser();
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<SignInContext.Provider
			value={{
				setEmail,
				setPassword,
				setError,
				user,
				email,
				password,
				error,
				agreeToTerms,
				setAgreeToTerms,
				rememberMe,
				setRememberMe,
				isPasswordVisible,
				setIsPasswordVisible,
				passwordErr,
				emailErr,
				handleEmailChange,
				handlePasswordChange,
				handleSignIn,
				isSubmitting,
				setEmailErr,
				setPasswordErr,
				handleGoogleSignIn,
				handleForgotPassword,
				resetPasswordEmailSent,
				setResetPasswordEmailSent,
				handleSignOut,
				setIsSubmitting,
				handleGithubSignIn,
			}}
		>
			{children}
		</SignInContext.Provider>
	);
};

export default SignInContext;
