import { useContext, useState } from "react";
import { ProjectContext, UserPreferencesContext } from "../../context";
import { HoverAccentColor } from "../../components";
import { DeleteIcon, EditCircleIcon } from "../../data/icon";

const FeatureItem = ({
	feature,
	setIsUpdate,
	setFeature,
	setUpdatedFeature,
	featureList,
}) => {
	const {
		setNewProject,
		setIsUpdating,
	} = useContext(ProjectContext);

	const { userPreferences } = useContext(UserPreferencesContext);

	const handleEdit = (feature) => {
		setIsUpdating(true);
		setIsUpdate(true);
		setFeature(feature);
		setUpdatedFeature(feature);
	};

	const handleDelete = (feature) => {
		const newList = featureList.filter(
			(featureList) => feature !== featureList
		);
		setNewProject((prev) => {
			return { ...prev, features: newList };
		});
	};

	return (
		<div
			style={{
				borderColor: userPreferences.shade.other,
				color: userPreferences.shade.text.secondaryText,
			}}
			className={`${userPreferences.border} flex justify-between items-center  py-3  px-4 border`}
		>
			<span className='text-sm'>{feature}</span>{" "}
			<div className='flex justify-between items-center gap-2'>
				<span onClick={() => handleEdit(feature)} className='cursor-pointer'>
					<HoverAccentColor>
						<EditCircleIcon className='w-4 h-4' />
					</HoverAccentColor>
				</span>
				<span onClick={() => handleDelete(feature)} className='cursor-pointer'>
					<HoverAccentColor>
						<DeleteIcon className='w-4 h-4' />
					</HoverAccentColor>
				</span>
			</div>
		</div>
	);
};

export default FeatureItem;
