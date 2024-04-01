import { useContext, useState } from "react";
import {
	ProjectContext,
	TaskContext,
	UserPreferencesContext,
} from "../../context";
import { ClipLoader } from "react-spinners";

const ChangeTaskStatus = ({ taskStatus }) => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { isSubmitting, setNewTask } = useContext(ProjectContext);
	const { setIsStatusOpen, isStatusOpen, handleUpdateTask } =
		useContext(TaskContext);

	const handleCancel = () => {
		console.log(isStatusOpen);
		console.log("true");
		setIsStatusOpen(false);
	};

	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = (item, index) => {
		setSelectedItem(index === selectedItem ? null : index);
		setNewTask((prev) => ({
			...prev,
			status: {
				id: item.id,
				title: item.status,
				color: item.color,
			},
		}));
	};

	return (
		<div
			style={{ backgroundColor: userPreferences.shade.card }}
			className={`${userPreferences.border} flex justify-center items-center flex-col p-6 xs:w-[320px] w-[280px]`}
		>
			<h1 className='mb-3'>Change Task Status</h1>
			<div
				style={{
					backgroundColor: userPreferences.shade.card,
					color: userPreferences.shade.text.primaryText,
					borderColor: userPreferences.shade.other,
				}}
				className={`${userPreferences.border} w-[250px] border`}
			>
				<ul className='py-2'>
					{taskStatus?.map((item, index) => (
						<li
							key={item.status}
							onClick={() => handleClick(item, index)}
							style={{ borderColor: userPreferences.shade.other }}
							className={`${
								taskStatus.length - 1 === index ? "border-none" : "border-b"
							} ${
								index === selectedItem ? "bg-black bg-opacity-50" : ""
							} flex items-center gap-2 py-2 px-5 cursor-pointer hover:opacity-70`}
						>
							<span
								style={{ color: `${item.color}` }}
								className='text-sm capitalize'
							>
								{item.status}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className='flex justify-between items-center w-full mt-6 gap-6'>
				<button
					onClick={handleCancel}
					style={{ backgroundColor: userPreferences.color }}
					className={`${userPreferences.border} h-10 w-1/2 px-7 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease`}
				>
					Cancel
				</button>
				<button
					onClick={handleUpdateTask}
					style={{ backgroundColor: userPreferences.color }}
					className={`${userPreferences.border} h-10 w-1/2 text-sm text-black font-medium hover:opacity-60 transition-opacity duration-200 ease flex justify-center items-center`}
				>
					{isSubmitting ? (
						<ClipLoader loading={true} color={"#FFFFFF"} size={28} />
					) : (
						"Update"
					)}
				</button>
			</div>
		</div>
	);
};

export default ChangeTaskStatus;
