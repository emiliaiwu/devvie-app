import { createContext, useState } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState({
		type: "",
		title: "",
		message: "",
	});
	const [toasting, setToasting] = useState(false);

	const showToast = (type, title, message) => {
		// Extract the part of the error message before the colon
		const errorMessage = message
			? message.split(":")[0].trim()
			: "An error occurred";

		setToasting(true);
		setToast({
			type: type,
			title: title,
			message: errorMessage,
		});
	};

	return (
		<ToastContext.Provider
			value={{ toast, toasting, setToasting, setToast, showToast }}
		>
			{children}
		</ToastContext.Provider>
	);
};
