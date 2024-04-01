import { useContext, useEffect, useState } from "react";
import { ToastContext, UserPreferencesContext } from "../../context";
import { CancelCircleIcon } from "../../data/icon";
import { BsCheck, BsInfo, BsExclamation, BsX } from "react-icons/bs";

const Toast = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { toast, toasting, setToasting, setToast } = useContext(ToastContext);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (toasting) {
			setShowToast(true);
			const timer = setTimeout(() => {
				setShowToast(false);
				setTimeout(() => {
					setToasting(false);
					setToast(null);
				}, 1100);
			}, 6000);

			return () => clearTimeout(timer);
		} else {
			setShowToast(false);
		}
	}, [toasting, setToasting, setToast]);

	const getIconAndColor = () => {
		switch (toast.type) {
			case "success":
				return {
					icon: <BsCheck className='w-9 h-9 text-white' />,
					color: "#4CAF50",
				};
			case "warning":
				return {
					icon: <BsExclamation className='w-9 h-9 text-white' />,
					color: "#FFC107",
				};
			case "danger":
				return {
					icon: <BsX className='w-9 h-9 text-white' />,
					color: "#FF0000",
				};
			case "info":
				return {
					icon: <BsInfo className='w-9 h-9 text-white' />,
					color: "#2196F3",
				};
			default:
				return { icon: "", color: "#333" };
		}
	};

	const { icon, color } = getIconAndColor();

	return (
		<div
			className={`${
				showToast
					? "right-10 md:right-20 transition-all duration-1000 ease-in-out"
					: "-right-[100%] transition-all duration-1000 ease-in-out"
			}  top-28 ${toast.type} absolute `}
		>
			<div
				style={{
					backgroundColor: userPreferences.shade.background,
					borderColor: `${color}`,
				}}
				className={`${userPreferences.border} relative border w-[260px] xs:w-[280px] min-h-[100px] overflow-hidden flex justify-center items-center `}
			>
				<div className='flex justify-between items-center w-full h-full'>
					<div
						style={{
							"--hove-color": `${color}`,
						}}
						className='h-full w-[100px] flex justify-center items-center'
					>
						<div
							style={{ backgroundColor: userPreferences.shade.background }}
							className='h-full w-full flex justify-center items-center'
						>
							<div
								style={{
									backgroundColor: `${color}`,
								}}
								className='flex justify-center items-center circle2 '
							>
								{icon}
							</div>
						</div>
					</div>
					<div className='w-full h-full pr-6 flex flex-col gap-1'>
						<h1
							style={{
								color: `${color}`,
							}}
							className='text-base whitespace-normal'
						>
							{toast.title}
						</h1>
						<p
							style={{
								color: userPreferences.shade.text.secondaryText,
							}}
							className='text-xs whitespace-normal'
						>
							{toast.message}
						</p>
					</div>
				</div>
				<button
					onClick={() => setToasting(false)}
					style={{
						color: userPreferences.shade.text.secondaryText,
					}}
					className='absolute right-3 top-3'
				>
					<CancelCircleIcon className='w-5 h-5 hover:scale-110 transition-all duration-200 ease' />
				</button>
			</div>
		</div>
	);
};

export default Toast;
