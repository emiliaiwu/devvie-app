import Column from "./Column";
import { useContext } from "react";
import { ProjectContext } from "../context";
import { projectStatus } from "../data/projectData";

const Board = () => {
	const { columns } = useContext(ProjectContext);
	const shapesArray = projectStatus.map((statusItem) => statusItem.shape);

	return (
		<div className='ss:overflow-x-scroll scroll-x ss:flex ss:flex-row sm:items-start py-5 gap-6 w-full ss:max-w-full grid ss:justify-normal justify-center items-center '>
			{columns.map((col, index) => (
				<Column
					key={col.id}
					color={col.color}
					statusName={col.title}
					icon={shapesArray[index]}
					columnId={col.id}
					projects={col.projects}
					column={col}
				/>
			))}
		</div>
	);
};

export default Board;
