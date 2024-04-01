import { createContext, useContext, useEffect, useState } from "react";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { AuthContext } from "../../context";
import { collectionColors } from "../data/projectData";

const LibraryContext = createContext();

export const LibraryContextProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const initialCollection = {
		title: "",
		description: "",
		color: collectionColors[0],
		links: [],
	};
	const initialLink = {
		title: "",
		link: "",
		tag: [],
	};
	const [newLink, setNewLink] = useState(initialLink);
	const [userCollection, setUserCollection] = useState([]);
	const [newCollection, setNewCollection] = useState(initialCollection);
	const [isCreateNewCollectionOpen, setIsCreateNewCollectionOpen] =
		useState(false);
	const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
	const [collectionToBeUpdated, setCollectionToBeUpdated] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const userId = user?.uid;

	// unique slug
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

	useEffect(() => {
		const fetchCollection = async () => {
			try {
				if (user) {
					fetchCollections();
				}
			} catch (error) {
				console.error("Error fetching folders and links:", error);
			}
		};

		fetchCollection();
	}, [user]);

	// Fetch Collestions
	const fetchCollections = async () => {
		const collectionRef = collection(firestore, `library/${userId}/folders`);

		const collectionSnapshot = await getDocs(collectionRef);

		const collectionData = await Promise.all(
			collectionSnapshot.docs.map(async (doc) => {
				const folderData = {
					id: doc.id,
					...doc.data(),
				};

				// Fetch links for each folder
				const linksRef = collection(
					firestore,
					`library/${userId}/folders/${doc.id}/links`
				);

				const linksSnapshot = await getDocs(linksRef);

				const linksData = [];
				linksSnapshot.forEach((doc) => {
					const createdAtTimestamp = doc.data().createdAt;
					const createdAtDate = createdAtTimestamp.toDate();

					const formattedDate = createdAtDate.toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
						year: "numeric",
					});

					linksData.push({
						id: doc.id,
						...doc.data(),
						createdAt: formattedDate,
					});
				});

				return { ...folderData, links: linksData };
			})
		);

		setUserCollection(collectionData);
	};

	// fetch links
	const fetchLinksInCollection = async (collectionId) => {
		// Fetch links for each folder
		const linksRef = collection(
			firestore,
			`library/${userId}/folders/${collectionId}/links`
		);

		const linksSnapshot = await getDocs(linksRef);

		const linksData = [];
		linksSnapshot.forEach((doc) => {
			const createdAtTimestamp = doc.data().createdAt;
			const createdAtDate = createdAtTimestamp.toDate();

			const formattedDate = createdAtDate.toLocaleDateString("en-US", {
				day: "numeric",
				month: "short",
				year: "numeric",
			});

			linksData.push({
				id: doc.id,
				...doc.data(),
				createdAt: formattedDate,
			});
		});
		setUserCollection((oldCollection) => {
			const newCollection = oldCollection.map((folder) =>
				folder.id === collectionId ? { ...folder, links: linksData } : folder
			);
			return newCollection;
		});
	};

	const handleCreateCollection = async () => {
		setIsSubmitting(true);
		try {
			const collectionRef = collection(
				firestore,
				`library/${user.uid}/folders`
			);

			await addDoc(collectionRef, {
				...newCollection,
				slug: generateSlug(newCollection.title),
				createdAt: new Date(),
			});

			const collectionSnapshot = await getDocs(collectionRef);

			const collectionData = collectionSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setUserCollection(collectionData);

			setNewCollection("");

			console.log("Folder created successfully!");
		} catch (error) {
			console.log("error:", error);
		} finally {
			setIsCreateNewCollectionOpen(false);
			setIsSubmitting(false);
			setNewCollection(initialCollection);
		}
	};

	const addLink = async (collectionId) => {
		setIsSubmitting(true);
		try {
			if (!user) {
				console.error("User is not defined");
				return;
			}

			const linksRef = collection(
				firestore,
				`library/${user.uid}/folders/${collectionId}/links`
			);

			await addDoc(linksRef, {
				...newLink,
				collectionId: collectionId,
				createdAt: new Date(),
			});

			// Fetch the updated data from Firestore
			await fetchLinksInCollection(collectionId);
		} catch (error) {
			console.error("Error adding link:", error);
		} finally {
			setIsAddLinkOpen(false);
			setNewLink(initialLink);
			setIsSubmitting(false);
		}
	};

	const deleteLink = async (collectionId, linkId) => {
		try {
			const linkRef = doc(
				firestore,
				`library/${user.uid}/folders/${collectionId}/links/${linkId}`
			);

			await deleteDoc(linkRef);
			console.log("Link deleted successfully");

			await fetchLinksInCollection(collectionId);
		} catch (error) {
			console.error("Error deleting link:", error);
		}
	};

	const deleteCollection = async (collectionId) => {
		try {
			// Get a reference to the links collection
			const linksRef = collection(
				firestore,
				`library/${user.uid}/folders/${collectionId}/links`
			);

			// Fetch all link documents from the links collection
			const linksSnapshot = await getDocs(linksRef);

			// Delete each link document
			await Promise.all(
				linksSnapshot.docs.map(async (linkDoc) => {
					const linkDocRef = doc(
						firestore,
						`library/${user.uid}/folders/${collectionId}/links/${linkDoc.id}`
					);

					await deleteDoc(linkDocRef);
				})
			);

			// Get a reference to the collection document
			const collectionRef = doc(
				firestore,
				`library/${user.uid}/folders/${collectionId}`
			);

			// Delete the collection document
			await deleteDoc(collectionRef);
			fetchCollections();

			console.log("Collection and links deleted successfully");
		} catch (error) {
			console.error("Error deleting collection and links:", error);
		}
	};

	const editCollection = (collection) => {
		setIsUpdating(true);
		setCollectionToBeUpdated(collection);
		setNewCollection((prev) => ({
			...prev,
			...collection,
		}));
		setIsCreateNewCollectionOpen(true);
	};

	const handleUpdateCollection = async () => {
		setIsSubmitting(true);
		try {
			const collectionId = collectionToBeUpdated.id;
			const collectionRef = doc(
				firestore,
				`library/${user.uid}/folders/${collectionId}`
			);

			await updateDoc(collectionRef, {
				...newCollection,
				updatedAt: new Date(),
			});

			// Fetch the updated data from Firestore
			const updatedCollectionSnapshot = await getDoc(collectionRef);
			const updatedCollection = {
				id: updatedCollectionSnapshot.id,
				...updatedCollectionSnapshot.data(),
			};

			// Update the user's collection state
			setUserCollection((prevCollection) =>
				prevCollection.map((collection) =>
					collection.id === collectionId ? updatedCollection : collection
				)
			);

			console.log("Folder updated successfully!");
		} catch (error) {
			console.error("Error updating folder:", error);
		} finally {
			setIsCreateNewCollectionOpen(false);
			setIsUpdating(false);
			setIsSubmitting(false);
			setNewCollection(initialCollection);
		}
	};

	return (
		<LibraryContext.Provider
			value={{
				handleCreateCollection,
				newCollection,
				setNewCollection,
				isCreateNewCollectionOpen,
				setIsCreateNewCollectionOpen,
				initialCollection,
				userCollection,
				setUserCollection,
				isAddLinkOpen,
				setIsAddLinkOpen,
				setNewLink,
				newLink,
				addLink,
				initialLink,
				deleteLink,
				deleteCollection,
				editCollection,
				handleUpdateCollection,
				isSubmitting,
				isUpdating,
			}}
		>
			{children}
		</LibraryContext.Provider>
	);
};

export default LibraryContext;
