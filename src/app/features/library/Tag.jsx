const Tag = ({ title, color }) => {
	return (
		<div
			style={{ backgroundColor: `${color}` }}
			className='py-[2px] px-2 text-xs rounded-md inline-flex text-white'
		>
			{title}
		</div>
	);
};

export default Tag;
