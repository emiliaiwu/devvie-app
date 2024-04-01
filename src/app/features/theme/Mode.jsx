


const Mode = ({ bgColor, card, other }) => {
	


	return (
		<div
			style={{ backgroundColor: bgColor }}
			className='md:w-60 w-52 rounded-2xl py-4 h-48 px-4 overflow-hidden'
		>
			<div
				style={{ backgroundColor: card }}
				className='w-full h-8 rounded-lg flex items-center px-4 mb-4'
			>
				<span
					style={{ backgroundColor: other }}
					className='w-20 h-2 inline-block'
				></span>
			</div>
			<div className='overflow-hidden rounded-lg flex flex-col gap-1'>
				<div
					style={{ backgroundColor: card }}
					className=' w-full h-8  flex items-center px-4 '
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2  inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-20  h-2 inline-block'
					></span>
				</div>
				<div
					style={{ backgroundColor: card }}
					className=' w-full h-8  flex items-center px-4 '
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2  inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-20  h-2 inline-block'
					></span>
				</div>
				<div
					style={{ backgroundColor: card }}
					className='w-full h-8  flex items-center px-4 '
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2  inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-20  h-2 inline-block'
					></span>
				</div>
				<div
					style={{ backgroundColor: card }}
					className='w-full h-8  flex items-center px-4 '
				>
					<span
						style={{ backgroundColor: other }}
						className='w-2 h-2  inline mr-2'
					></span>
					<span
						style={{ backgroundColor: other }}
						className='w-20  h-2 inline-block'
					></span>
				</div>
			</div>
		</div>
	);
};

export default Mode;
