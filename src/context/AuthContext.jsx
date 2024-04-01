import { createContext, useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
	sendEmailVerification,
	confirmPasswordReset,
	updateProfile,
	GithubAuthProvider,
	browserLocalPersistence,
	browserSessionPersistence,
	setPersistence,
	EmailAuthProvider,
	reauthenticateWithCredential,
	deleteUser,
	getRedirectResult,
} from "firebase/auth";
import { auth, firestore, storage } from "../firebase";
import { remove } from "firebase/database";
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from "firebase/firestore";
import { deleteObject, getMetadata, ref } from "firebase/storage";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [wantToChangePassword, setWantToChangePassword] = useState(false);
	const [password, setPassword] = useState("");
	const [myPassword, setMyPassword] = useState("");
	const [renderGoodbye, setRenderGoodbye] = useState(false);

	const updateDisplayName = (userName) => {
		return updateProfile(auth.currentUser, { displayName: userName });
	};

	// sign up
	const signUpUser = async (email, password) => {
		await setPersistence(auth, browserSessionPersistence);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	// sign in
	const signIn = async (email, password, rememberMe) => {
		const persistence = rememberMe
			? browserLocalPersistence
			: browserSessionPersistence;

		await setPersistence(auth, persistence);

		return signInWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = () => {
		setUser(null);
		return signOut(auth);
	};

	const forgotPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const verifyEmail = (email) => {
		return sendEmailVerification(auth, email);
	};

	const resetPassword = (oobCode, newPassword) => {
		return confirmPasswordReset(auth, oobCode, newPassword);
	};

	const googleSignIn = async () => {
		await setPersistence(auth, browserLocalPersistence);
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	};

	const githubSignIn = async () => {
		await setPersistence(auth, browserLocalPersistence);
		const githubAuthProvider = new GithubAuthProvider();
		return signInWithPopup(auth, githubAuthProvider);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const deleteData = async () => {
		try {
			// Delete data in Firestore
			await deleteDoc(doc(firestore, "userPreferences", user.uid));

			// Delete data in Firestore (usersProfile collection)
			const userProfileDoc = doc(firestore, "usersProfile", user.uid);
			const userProfileDocSnapshot = await getDoc(userProfileDoc);
			if (userProfileDocSnapshot.exists()) {
				await deleteDoc(userProfileDoc);
			}

			// Delete data in Firestore (library collection)
			const libraryDoc = doc(firestore, "library", user.uid);
			const libraryDocSnapshot = await getDoc(libraryDoc);
			if (libraryDocSnapshot.exists()) {
				await deleteDoc(libraryDoc);
			}

			// Delete data in Firestore (projectBoard collection)
			const projectBoardDoc = doc(firestore, "projectBoard", user.uid);
			const projectBoardDocSnapshot = await getDoc(projectBoardDoc);
			if (projectBoardDocSnapshot.exists()) {
				await deleteDoc(projectBoardDoc);
			}

			// Delete data in Storage (images folder)
			const imagesRef = ref(storage, `images/${user.uid}`);
			try {
				await getMetadata(imagesRef);
				await deleteObject(imagesRef);
			} catch (error) {
				if (error.code === "storage/object-not-found") {
					// File doesn't exist, proceed with the next steps
				} else {
					throw error; // Rethrow other errors
				}
			}
		} catch (error) {
			console.error("Error deleting data:", error.message);
			throw error;
		}
	};

	const handleProceedToDelete = async () => {
		if (wantToChangePassword && myPassword) {
			// Reauthenticate user with entered password
			const credential = EmailAuthProvider.credential(user.email, myPassword);

			try {
				await reauthenticateWithCredential(user, credential);
				// Reauthentication successful, proceed with account deletion
				await deleteUser(user);
				await deleteData();
				console.log("User account deleted successfully.");
				setMyPassword("");
			} catch (reauthError) {
				console.error("Error re-authenticating user:", reauthError.message);
				setMyPassword("");
			}
		} else {
			// Handle other cases as needed
		}
	};

	const deleteAccount = async () => {
		try {
			if (user) {
				const providerId = user.providerData[0].providerId;
				switch (providerId) {
					case "password":
						setWantToChangePassword(true);
						setRenderGoodbye(true);

						break;
					case "google.com":
					case "github.com": {
						try {
							const userCredential =
								providerId === "google.com"
									? await googleSignIn()
									: await githubSignIn();
							const authProvider =
								providerId === "google.com"
									? GoogleAuthProvider
									: GithubAuthProvider;

							const credential =
								authProvider.credentialFromResult(userCredential);

							await reauthenticateWithCredential(user, credential);
							setRenderGoodbye(true);
							await deleteUser(user);
							await deleteData();

							console.log("User account deleted successfully.");
						} catch (error) {
							console.error("Error deleting account:", error.message);
							throw error;
						}

						break;
					}
					default:
						console.error("Unsupported provider:", providerId);
				}
			} else {
				console.error("No user is currently authenticated.");
			}
		} catch (error) {
			console.error("Error deleting account:", error.message);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signUpUser,
				loading,
				setLoading,
				user,
				signIn,
				signOutUser,
				googleSignIn,
				githubSignIn,
				forgotPassword,
				verifyEmail,
				resetPassword,
				updateDisplayName,
				deleteAccount,
				wantToChangePassword,
				setWantToChangePassword,
				setPassword,
				handleProceedToDelete,
				myPassword,
				setMyPassword,
				renderGoodbye,
				setRenderGoodbye,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
