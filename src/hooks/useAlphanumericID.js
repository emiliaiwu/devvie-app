

function useAlphanumericID(idLength = 6) {
	const generateID = () => {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let id = "";

		for (let i = 0; i < idLength; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			id += characters[randomIndex];
		}

		return id;
	};

	return generateID;
}

export default useAlphanumericID;
