import { useContext } from "react";
import { ToastContext } from "../../context";

const ToastDemo = () => {
	const { showToast } = useContext(ToastContext);

	const handleSuccess = () => {
		showToast(
			"success",
			"Profile Saved!",
			"Click the publish button to make your profile public"
		);
	};
const handleDanger = () => {
	showToast("danger", "Profile Not Saved!", "An error occured");
    };


    
    const handleWarning = () => {
			showToast(
				"warning",
				"Form incomplete",
				"Additional information is required"
			);
    };
    
    const handleinfo = () => {
			showToast(
				"info",
				"Friendly reminder",
				"You can customize your profile settings in the app to enhance your experience"
			);
		};
	return (
		<div className='flex flex-row gap-4'>
			<button onClick={handleSuccess} className='py-3 px-4 bg-purple-600 text-white'>Success</button>
			<button onClick={handleDanger} className='py-3 px-4 bg-purple-600 text-white'>Danger</button>
			<button onClick={handleWarning} className='py-3 px-4 bg-purple-600 text-white'>Warning</button>
			<button onClick={handleinfo} className='py-3 px-4 bg-purple-600 text-white'>Info</button>
		</div>
	);
};

export default ToastDemo;
