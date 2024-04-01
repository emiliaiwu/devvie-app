import { useContext } from "react";
import { noFiles2 } from "../../assets";
import { UserPreferencesContext } from "../context";

const NoDataSmall = ({ paragraph }) => {
	const { userPreferences } = useContext(UserPreferencesContext);

	return (
		<div className='flex flex-col px-6 justify-center items-center flex-1 max-w-[300px] max-h-[300px] w-full h-full'>
			<div className='flex justify-center items-center -mt-4'>
				<img src={noFiles2} className='aspect-auto w-[220px] lg:w-[200px]' />
			</div>
			<div className='flex flex-col px-6 justify-center items-center w-full -mt-5'>
				{" "}
				<h1 style={{color: userPreferences.color}} className='text-2xl md:text-3xl font-semibold'>Oh No!</h1>
				<p
					style={{
						color: userPreferences.shade.text.secondaryText,
					}}
					className='text-base'
				>
					{paragraph}
				</p>
			</div>
		</div>
	);
};

export default NoDataSmall;
