import { useState, useMemo, useRef } from "react";

const DynamicText = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const cursorRef = useRef(null); // Ref to the cursor element

	const textArray = useMemo(
		() => ["Software", "Backend", "Frontend", "Mobile", "Game", "Fullstack"],
		[]
	);

	const handleAnimationEnd = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
	};

	return (
		<span className='bg-changing-text text-left mx-2 overflow-hidden '>
			<span className='changing-text inline-block px-3'>
				<span
					ref={cursorRef}
					className='wipe-text'
					onAnimationIteration={handleAnimationEnd}
				></span>
				{textArray[currentIndex]}
			</span>
		</span>
	);
};

export default DynamicText;
