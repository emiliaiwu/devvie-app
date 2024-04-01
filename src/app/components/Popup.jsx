import { CancelCircleIcon } from "../data/icon";
import HoverAccentColor from "./HoverAccentColor";

const Popup = ({ children, setIsOpen }) => {
	return (
		<div className='fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80'>
			<div className='relative'>
				<button
					onClick={() => setIsOpen(false)}
					className='absolute right-0 -top-8 cursor-pointer text-white'
				>
					<HoverAccentColor>
						<CancelCircleIcon className='w-6 h-6' />
					</HoverAccentColor>
				</button>

				{children}
			</div>
		</div>
	);
};

export default Popup;
