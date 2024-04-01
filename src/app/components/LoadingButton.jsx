import { useContext } from "react";
import { UserPreferencesContext } from "../context";
import { ClipLoader } from "react-spinners";

const LoadingButton = ({ isUpdating, handleUpdate, handleCreate, isSubmitting }) => {
    const {userPreferences} = useContext(UserPreferencesContext)
	return (
		<button
			onClick={isUpdating ? handleUpdate : handleCreate}
			style={{ backgroundColor: userPreferences.color }}
			className={`${userPreferences.border} h-11 w-36 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease flex justify-center items-center`}
		>
			{isSubmitting ? (
				<ClipLoader loading={true} color={"#FFFFFF"} size={28} />
			) : isUpdating ? (
				"Update task"
			) : (
				"Create task"
			)}
		</button>
	);
};

export default LoadingButton;
