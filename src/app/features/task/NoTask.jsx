import { useContext } from "react";
import { noFiles } from "../../../assets";
import { UserPreferencesContext } from "../../context";

const NoTask = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	return (
		<div
			style={{ backgroundColor: userPreferences.shade.background }}
			className='w-full h-full flex justify-center items-center flex-col inset-0 fixed'
		>
			<div className='flex justify-center items-center'>
				<img src={noFiles} className='w-full aspect-auto lg:w-[400px]' />
			</div>
			<div className='flex flex-col -mt-10'>
				<h1 style={{color: userPreferences.color}} className='text-4xl pb-4 text-center font-semibold'>
					No Page Found!
				</h1>
				<p style={{color: userPreferences.shade.text.primaryText}} className='text-base text-center whitespace-normal'>
					Go back to projects
				</p>
			</div>
		</div>
	);
};

export default NoTask;
