import { useContext, useEffect, useState } from "react";
import { goodbyeImg } from "../../assets";
import { AuthContext } from "../../context";
import { DashboardContext, UserProfileContext } from "../context";

const LoadingOut = () => {
	const { setRenderGoodbye } = useContext(AuthContext);
	const { firstName } = useContext(DashboardContext);
	const { userProfile } = useContext(UserProfileContext);

	const [progress, setProgress] = useState("0%");

	useEffect(() => {
		// Animate the progress bar width to 100% over 2 seconds
		const animationDuration = 5000; // in milliseconds
		const interval = 10; // update interval in milliseconds
		let currentWidth = 0;

		const updateProgress = () => {
			currentWidth += (interval / animationDuration) * 100;
			setProgress(`${Math.min(currentWidth, 100)}%`);
		};

		const intervalId = setInterval(updateProgress, interval);

		const timeoutId = setTimeout(() => {
			setRenderGoodbye(false);
		}, animationDuration);

		// Clear the interval and timeout when the component unmounts
		return () => {
			clearInterval(intervalId);
			clearTimeout(timeoutId);
        };
        
	}, [setRenderGoodbye]);

	return (
		<div
			className={`z-[1000] fixed inset-0 bg-white flex justify-center items-center overflow-y-auto`}
		>
			<div className='px-8 md:px-0 flex flex-col gap-4 justify-center items-center'>
				<div className='md:max-w-[360px] xxl:max-w-[500px] w-full xs:max-w-[280px]'>
					<img src={goodbyeImg} className='w-full' />
				</div>
				<div className='max-w-[300px] w-full'>
					<div
						style={{ width: "100%" }}
						className='h-2 bg-slate-400 rounded-full flex justify-left items-center '
					>
						<div
							style={{ width: `${progress}` }}
							className='h-2 bg-red-600 rounded-full transition-width duration-[5000] transform origin-left'
						></div>
					</div>
				</div>
				<h4 className='w-full text-center text-2xl font-semibold font-DMSans'>
					Goodbye {userProfile.firstName || firstName}
				</h4>
			</div>
		</div>
	);
};

export default LoadingOut;
