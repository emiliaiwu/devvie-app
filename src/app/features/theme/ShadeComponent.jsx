const ShadeComponent = ({ bgColor, card, other }) => {
	return (
		<div
			style={{ backgroundColor: bgColor }}
			className='w-full bg-slate-400 rounded-2xl py-2 h-32 px-3 overflow-hidden'
		>
			<div
				style={{ backgroundColor: card }}
				className='w-full h-6 rounded-md flex items-center px-4 mb-3'
			>
				<span
					style={{ backgroundColor: other }}
					className='w-10 h-2 inline-block'
				></span>
			</div>
			<div className='overflow-hidden rounded-md flex flex-col gap-1'>
				<div
					style={{ backgroundColor: card }}
					className='w-full h-6 rounded-md flex items-center px-4 mb-1'
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2 inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-10 h-2 inline-block'
					></span>
				</div>
				<div
					style={{ backgroundColor: card }}
					className='w-full h-6 rounded-md flex items-center px-4 mb-1'
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2 inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-10 h-2 inline-block'
					></span>
				</div>
				<div
					style={{ backgroundColor: card }}
					className='w-full h-6 rounded-md flex items-center px-4 mb-1'
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2 inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-10 h-2 inline-block'
					></span>
				</div>
				<div
					style={{ backgroundColor: card }}
					className='w-full h-6 rounded-md flex items-center px-4 mb-4'
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2 inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-10 h-2 inline-block'
					></span>
				</div>
			</div>
		</div>
	);
};

export default ShadeComponent;
