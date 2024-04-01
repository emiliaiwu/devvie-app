import { BsFillCircleFill } from "react-icons/bs";

const PriorityTag = ({ tag }) => {
	
	return (
		<div
			style={{
				// backgroundColor: tag.background,
				color: tag?.color,
			}}
			className='py-1 flex items-center gap-[5px] text-xs uppercase'
		>
			<span className="p-1">
				<BsFillCircleFill className='w-2 h-2' />
			</span>
			<span >{tag?.tag}</span>
		</div>
	);
};

export default PriorityTag;
