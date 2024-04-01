import { createContext, useContext, useState } from "react";
import { AuthContext } from "../../context";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [wantToLogout, setWantToLogout] = useState(false);
    const [wantToDeleteAccount, setWantToDeleteAccount] = useState(false);
    const [wantToChangePassword, setWantToChangePassword] = useState(false);
	const userPhoto = user?.photoURL;
	const displayName = user?.displayName;

	return (
		<UserContext.Provider
			value={{
				userPhoto,
				displayName,
				wantToLogout,
				setWantToLogout,
				wantToDeleteAccount,
				setWantToDeleteAccount,
				wantToChangePassword,
				setWantToChangePassword,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
