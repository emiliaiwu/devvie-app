import { useContext, useState } from "react";
import { ProjectContext, UserPreferencesContext } from "../../context";
import { AddIcon } from "../../data/icon";
import FeatureItem from "./FeatureItem";

const ProjectFeature = () => {
	const {
		isSubmitting,
		isUpdating,
		newProjectErrors,
		newProject,
		setNewProject,
	} = useContext(ProjectContext);

	const { userPreferences } = useContext(UserPreferencesContext);
	const [feature, setFeature] = useState("");
	const [isUpdate, setIsUpdate] = useState(false);
	const [updatedFeature, setUpdatedFeature] = useState("");

	const handleAddFeature = () => {
		if (feature.trim() === "") {
			return;
		} else {
			setNewProject((prev) => {
				return { ...prev, features: [...prev.features, feature] };
			});
			setFeature("");
		}
	};

	const handleUpdate = (updatedFeature) => {
		const indexToUpdate = newProject.features.findIndex(
			(item) => item === updatedFeature
		);

		if (indexToUpdate !== -1) {
			const updatedFeatures = [...newProject.features];
			updatedFeatures[indexToUpdate] = feature;

			setNewProject((prev) => {
				return { ...prev, features: updatedFeatures };
			});
		} else {
			console.error("Item not found for update");
		}

		setUpdatedFeature("");
		setFeature("");
		setIsUpdate(false);
	};

	return (
		<div className='flex flex-col gap-2 '>
			<label htmlFor='features'>Features</label>
			<input
				style={{ backgroundColor: userPreferences.shade.card }}
				type='text'
				id='feature'
				name='feature'
				placeholder='Enter key features'
				value={feature}
				onChange={(e) => setFeature(e.target.value)}
				className={`${userPreferences.border} w-full px-4 py-3 focus:outline-none text-sm md:text-base mb-1`}
			/>
			<div className="flex flex-col gap-2">
				{newProject.features?.map((feature) => (
					<FeatureItem
						key={feature}
						feature={feature}
						setIsUpdate={setIsUpdate}
						setFeature={setFeature}
						setUpdatedFeature={setUpdatedFeature}
						featureList={newProject.features}
					/>
				))}
			</div>
			<button
				onClick={(e) => {
					e.preventDefault();
					!isUpdate ? handleAddFeature() : handleUpdate(updatedFeature);
				}}
				style={{
					backgroundColor: userPreferences.color,
					color: `${userPreferences.isLightMode ? "white" : "black"}`,
				}}
				className={`${userPreferences.border} flex justify-center items-center py-3 px-4 gap-1 text-sm hover:opacity-60 transition-all duration-200 ease `}
			>
				<AddIcon className='w-5 h-5' />{" "}
				{!isUpdate ? "Add Feature" : "Update Feature"}
			</button>

			<div className='flex justify-between items-center'></div>
		</div>
	);
};

export default ProjectFeature;
