import { Outlet } from "react-router-dom";

const ProjectLayout = () => {
	return (
		<section className='mx-auto w-full'>
			<Outlet />
		</section>
	);
};

export default ProjectLayout;
