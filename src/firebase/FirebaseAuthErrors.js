// firebaseAuthErrors.js

const authErrors = {
	"auth/invalid-email": "Invalid email address",
	"auth/user-disabled": "Your account has been disabled",
	"auth/user-not-found": "User not found. Please sign up",
	"auth/wrong-password": "Incorrect password. Please try again.",
	"auth/email-already-in-use": "Email address is already in use.",
	"auth/operation-not-allowed": "This operation is not allowed.",
	"auth/weak-password": "The password is too weak.",
	"auth/requires-recent-login":
		"This action requires you to sign in again for security reasons.",
	"auth/provider-already-linked":
		"This account is already linked with the selected provider.",
	"auth/credential-already-in-use": "This credential is already in use",
	"auth/invalid-verification-code":
		"Invalid verification code. Please check your code and try again.",
	"auth/invalid-verification-id":
		"Invalid verification ID. Please request a new verification code.",
	"auth/network-request-failed":
		"A network error occurred. Please check your internet connection and try again.",
	"auth/missing-email": "Email is empty. Please enter your email.",
};

export default authErrors;
