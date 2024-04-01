import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { authErrors } from "../firebase";

const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
	const { signUpUser, googleSignIn, updateDisplayName, githubSignIn } =
		useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [passwordErr, setPasswordErr] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [userName, setUserName] = useState("");
	const [rememberPassword, setRememberPassword] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [nameError, setNameError] = useState("");

	// handle email change
	const handleUserNameChange = (username) => {
		setUserName(username);
		setNameError("");
	};

	// handle email change
	const handleEmailChange = (newEmail) => {
		setEmail(newEmail);
		setEmailErr("");
	};

	// handle password change
	const handlePasswordChange = (newPassword) => {
		setPassword(newPassword);
		setPasswordErr(""); // Clear email error when the email input changes
	};

	// SignUp function
	const handleSignUp = async (e, navigate) => {
		e.preventDefault();
		setError("");
		setIsPasswordVisible(false);
		setIsSubmitting(true);

		// Your password validation regex pattern
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

		if (!passwordRegex.test(password)) {
			setPasswordErr(
				"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
			);
			setIsSubmitting(false);
			return;
		}

		try {
			await signUpUser(email, password);

			try {
				await updateDisplayName(userName);
				setIsSubmitting(false);
				navigate("/user/dashboard");
			} catch (err) {
				setIsSubmitting(false);
				setNameError(err.message);
			}
		} catch (err) {
			setIsSubmitting(false);
			const errorCode = err.code;
			let errorMessage = "An unknown error occurred. Please try again later.";

			if (errorCode.includes("password")) {
				errorMessage =
					authErrors[errorCode] ||
					"An unknown error occurred. Please try again later.";
				setPasswordErr(errorMessage);
			} else if (errorCode.includes("user") || errorCode.includes("email")) {
				errorMessage =
					authErrors[errorCode] ||
					"An unknown error occurred. Please try again later.";
				setEmailErr(errorMessage);
			} else {
				setError(errorMessage);
			}
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
			console.log(error);
		}
	};

	// Github sign
	const handleGithubSignIn = async (e, navigate) => {
		e.preventDefault();
		try {
			await githubSignIn();
			navigate("/user/dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<SignUpContext.Provider
			value={{
				setEmail,
				setPassword,
				setError,
				email,
				password,
				error,
				handleSignUp,
				userName,
				handleUserNameChange,
				rememberPassword,
				setRememberPassword,
				isPasswordVisible,
				setIsPasswordVisible,
				passwordErr,
				emailErr,
				handleEmailChange,
				handlePasswordChange,
				isSubmitting,
				setEmailErr,
				setPasswordErr,
				handleGoogleSignIn,
				handleGithubSignIn,
				nameError,
				setNameError,
			}}
		>
			{children}
		</SignUpContext.Provider>
	);
};

export default SignUpContext;
