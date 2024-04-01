import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firestore, storage } from "../../firebase";
import { v4 } from "uuid";
import { AuthContext } from "../../context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContext } from "./ToastContext";

const UserProfileContext = createContext();

export const UserProfileContextProvider = ({ children }) => {
	const { user, setLoading, loading } = useContext(AuthContext);
	const [openImage, setOpenImage] = useState(false);
	
	const userId = user?.uid || null;
	const [userTechStack, setUserTechStack] = useState([]);
	const [isSaving, setIsSaving] = useState(false);
	const { showToast } = useContext(ToastContext);
	
	// Random Numbers
	const generateRandomNumbers = () => {
		let randomNumbers = [];

		for (let i = 0; i < 5; i++) {
			const randomNumber = Math.floor(Math.random() * 100);
			randomNumbers.push(randomNumber);
		}

		return randomNumbers;
	};

	const randomNumbers = generateRandomNumbers();
	const generateSlug = (title) => {
		const cleanedString = title.replace(/[^a-zA-Z0-9\s]/g, "");
		const randomSlug = randomNumbers.join("");
		const combinedSlug = `${cleanedString}-${randomSlug}`;
		return combinedSlug.replace(/\s+/g, "-").toLowerCase();
	};

	const initialProfile = {
		firstName: "",
		lastName: "",
		username: "",
		jobTitle: "",
		location: "",
		aboutYou: "",
		isPublished: false,
		techStack: [],
		projects: [],
		workExperience: [],
		projectExperience: [],
		contact: [],
		hireMe: false,
		remotely: false,
		share: true,
		education: [],
		certification: [],
		socials: {},
		hasWorkExperience: false,
		coverPhoto: null,
		userPhoto: "",
	};
	const [userProfile, setUserProfile] = useState(initialProfile);
	const dpName = userProfile?.firstName + " " + userProfile?.lastName;
	const displayName =
		userProfile?.firstName.length === 0 ? user?.displayName : dpName;
	const email = user?.email;

	const saveUserProfile = async () => {
		setIsSaving(true);
		try {
			const profileRef = doc(firestore, "usersProfile", userId);
			await setDoc(profileRef, userProfile);
			const profileSnapshot = await getDoc(profileRef);
			const profileData = profileSnapshot.data();
			setUserProfile(profileData);
			showToast(
				"success",
				"Profile Saved!",
				"Click publish button to make your profile public"
			);
		} catch (error) {
			console.log("error occured", error);
			showToast("danger", "Profile Not Saved!", "An error occured");
		} finally {
			setIsSaving(false);
		}
	};

	const handleFileUpload = async (event, imageKey) => {
		const file = event.target.files[0];
		console.log(imageKey);

		// const storageRef = ref(storage, `images/${userId}`);
		if (file) {
			try {
				if (user) {
					const fileRef = ref(
						storage,
						`images/${userId}/${imageKey}/img${file.name + v4()}`
					);
					await uploadBytes(fileRef, file);

					const downloadURL = await getDownloadURL(fileRef);

					// Update myImages state
					setUserProfile((prevProfile) => ({
						...prevProfile,
						[imageKey]: downloadURL,
					}));

					console.log(userProfile);

					console.log(`${imageKey} uploaded successfully!`);
				} else {
					return;
				}
			} catch (error) {
				console.error(`Error handling ${imageKey} upload:`, error);
			}
		}
	};

	const fetchProfile = async () => {
		try {
			setLoading(true);
			const profileRef = doc(firestore, `usersProfile/${userId}`);
			const profileSnapshot = await getDoc(profileRef);

			if (profileSnapshot.exists()) {
				const profileData = profileSnapshot.data();
				setUserProfile(profileData);
			} else {
				console.warn("Profile not found for user ID:", userId);
			}
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	};

	useEffect(() => {
		if (user) {
			fetchProfile();
			const profileRef = doc(firestore, `usersProfile/${userId}`);
			const unsubscribe = onSnapshot(profileRef, (snapshot) => {
				if (snapshot.exists()) {
					const profileData = snapshot.data();
					setUserProfile(profileData);
				} else {
					console.warn("Profile not found for user ID:", userId);
				}
			});
			setLoading(false);
			return () => {
				unsubscribe();
			};
		}
	}, [user, userId]);

	

	return (
		<UserProfileContext.Provider
			value={{
				userProfile,
				setUserProfile,
				userTechStack,
				setUserTechStack,
				isSaving,
				saveUserProfile,
				openImage,
				setOpenImage,
				handleFileUpload,
				
				displayName,
				email,
				generateSlug,
			}}
		>
			{children}
		</UserProfileContext.Provider>
	);
};

export default UserProfileContext;
