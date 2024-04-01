const Tag = ({ color, children }) => {
	return (
		<div
			style={{ backgroundColor: color }}
			className='text-xs px-3 py-[5px] rounded-2xl text-white flex flex-row items-center'
		>
			{children}
		</div>
	);
};

export default Tag;
