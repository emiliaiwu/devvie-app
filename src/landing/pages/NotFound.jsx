import { noFiles } from "../../assets";
import Button from "../components/Button";

const NotFound = () => {
	return (
		<div className='w-full h-full flex justify-center items-center flex-col'>
			<div className='flex justify-center items-center'>
				<img src={noFiles} className='w-full aspect-auto lg:w-[400px]' />
			</div>
			<div className='flex flex-col -mt-10'>
				<h1 className='text-4xl pb-4 text-center font-semibold'>
					No Page Found!
				</h1>
				<p className='text-base text-center whitespace-normal'>
					Go back or sign up below
				</p>
			</div>
			<div className="mt-8 w-32">
				<Button
					url={"signup"}
					text={"Sign up"}
					className={" text-black bg-landingPrimary block"}
				/>
			</div>
		</div>
	);
};

export default NotFound;
