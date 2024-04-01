import React, { useContext } from "react";
import { UserPreferencesContext } from "../context";
import Card from "./Card";

const MemoizedColumn = React.memo(
	({ icon: IconComponent, statusName, color, projects, columnId }) => {
		const { userPreferences } = useContext(UserPreferencesContext);

		return (
			<div
				style={{
					color: userPreferences.shade.text.primaryText,
					fontFamily: userPreferences.font.fontFamily,
					backgroundColor: userPreferences.shade.card,
				}}
				className={`${userPreferences.border} w-[280px]  xs:w-[320px] lg:w-[340px] pb-5 flex-shrink-0 overflow-hidden`}
			>
				<div className='flex items-center justify-between mb-5  '>
					<div
						style={{ backgroundColor: `${color}` }}
						className='h-[52px] w-full px-4  flex justify-between items-center '
					>
						<div className='flex items-center gap-1 text-white'>
							<span>
								<IconComponent className='w-[13px] h-[13px] mr-1' />
							</span>
							<span className='text-base md:text-lg capitalize'>{statusName}</span>{" "}
						</div>

						<div
							className='text-[13px] rounded-full flex justify-center items-center w-7 h-7'
							style={{
								color: userPreferences.shade.text.secondaryText,
								backgroundColor: userPreferences.shade.other,
							}}
						>
							<span>{projects ? projects.length
								: "0"}</span>
						</div>
					</div>
				</div>

				<div className="flex justify-center items-center w-full pl-4 pr-[6px]">
					<div className='flex flex-col gap-4 h-[700px] overflow-y-scroll overflow-x-hidden scroll w-full pr-1 '>
						{projects?.map((project) => (
							<Card key={project.id} project={project} columnId={columnId} />
						))}
					</div>
				</div>
			</div>
		);
	}
);

MemoizedColumn.displayName = "Column";

export default MemoizedColumn;
