

const Overlay = ({ children }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div className='fixed inset-0 bg-black opacity-80'></div>

			{children}
		</div>
	);
};

export default Overlay;
