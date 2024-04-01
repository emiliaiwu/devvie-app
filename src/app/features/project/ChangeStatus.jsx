import { UserPreferencesContext, ProjectContext } from "../../context";
import { projectStatus } from "../../data/projectData";
import { useContext, createElement, useMemo, useState } from "react";

const ChangeStatus = ({ project }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { columns, setProjectToBeUpdated, setNewProject } =
		useContext(ProjectContext);
	const memoizedShapes = useMemo(() => {
		const shapesArray = projectStatus.map((statusItem) => statusItem.shape);
		return shapesArray;
	}, []);

	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = (item, index) => {
		setSelectedItem(index === selectedItem ? null : index)
		setNewProject((prev) => ({
			...prev,
			status: {
				id: item.id,
				title: item.title,
				color: item.color,
			},
		}));
		setProjectToBeUpdated(project);
	};

	return (
		<div
			style={{
				backgroundColor: userPreferences.shade.card,
				color: userPreferences.shade.text.primaryText,
				borderColor: userPreferences.shade.other,
			}}
			className={`${userPreferences.border} w-full border pr-1 pt-4 pb-3`}
		>
			<ul className='overflow-y-scroll scroll h-60'>
				{columns.map((item, index) => (
					<li
						onClick={() => handleClick(item, index)}
						style={{ borderColor: userPreferences.shade.other }}
						key={item.id}
						className={`${
							projectStatus.length - 1 === index ? "border-none" : "border-b"
						} ${
							index === selectedItem ? "bg-black bg-opacity-50" : ''
						} flex items-center gap-2 p-3 pl-7 cursor-pointer hover:bg-black hover:bg-opacity-20`}
					>
						<span style={{ color: `${item.color}` }}>
							{createElement(memoizedShapes[index], {
								className: "w-[13px] h-[13px] mr-1",
							})}
						</span>
						<span
							style={{ color: `${item.color}` }}
							className='text-base capitalize'
						>
							{item.title}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ChangeStatus;
