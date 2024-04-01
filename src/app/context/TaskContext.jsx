import { createContext, useContext, useState } from "react";
import { ProjectContext } from ".";
import { firestore } from "../../firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const {
		setIsSubmitting,
		userId,
		fetchProjectsUnderColumn,
		newTask,
		setNewTask,
		taskToBeUpdated,
		handleModalClose,
		initialNewTask,
		setIsNewTaskModalOpen,
		isNewTaskModalOpen,
		setTaskToBeUpdated,
		setOriginalColumns,
		setColumns,
	} = useContext(ProjectContext);

	const [listItems, setListItems] = useState([]);
	const [isStatusOpen, setIsStatusOpen] = useState(false);
	const [updatedTaskStatus, setUpdatedTaskStatus] = useState([]);

	// create new task------------------------------------------------------------------------------------------------
	const createNewTask = async (columnId, projectId, slug) => {
		setIsSubmitting(true);
		const taskColumnId = newTask?.status.id;
		try {
			const taskColumnRef = doc(
				firestore,
				`projectBoard/${userId}/columns/${columnId}/projects/${projectId}/taskColumns/${taskColumnId}`
			);

			const newTaskRef = await addDoc(collection(taskColumnRef, "tasks"), {
				title: newTask.title,
				description: newTask.description,
				priority: newTask.priority,
				list: newTask.list,
				tag: newTask.tag,
				status: newTask.status,
				taskColumnId: taskColumnId,
				projectId: projectId,
				columnId: columnId,
				projectSlug: slug,
			});

			// Fetch the newly created task data
			const newTaskSnapshot = await getDoc(newTaskRef);
			const newTaskData = {
				id: newTaskSnapshot.id,
				...newTaskSnapshot.data(),
			};

			// Update React state for columns with the new project
			setColumns((prevColumns) => {
				const updatedColumns = [...prevColumns].map((column) => {
					if (column.id === columnId) {
						return {
							...column,
							projects: column.projects.map((project) => {
								if (project.id === projectId) {
									return {
										...project,
										taskColumns: project.taskColumns.map((taskColumn) => {
											if (taskColumn.id === taskColumnId) {
												return {
													...taskColumn,
													tasks: [...taskColumn.tasks, newTaskData],
												};
											}
											return taskColumn;
										}),
									};
								}
								return project;
							}),
						};
					}
					return column;
				});

				return updatedColumns;
			});



			setOriginalColumns((prevColumns) => {
				const updatedColumns = [...prevColumns].map((column) => {
					if (column.id === columnId) {
						return {
							...column,
							projects: column.projects.map((project) => {
								if (project.id === projectId) {
									return {
										...project,
										taskColumns: project.taskColumns.map((taskColumn) => {
											if (taskColumn.id === taskColumnId) {
												return {
													...taskColumn,
													tasks: [...taskColumn.tasks, newTaskData],
												};
											}
											return taskColumn;
										}),
									};
								}
								return project;
							}),
						};
					}
					return column;
				});

				return updatedColumns;
			});
		} catch (error) {
			console.error("Error creating project:", error);
		} finally {
			setIsSubmitting(false);
			handleModalClose();
			setNewTask(initialNewTask);
			setIsNewTaskModalOpen(false);
		}
		// Reset form and close modal
		setIsSubmitting(false);
		setNewTask(initialNewTask);
	};

	// delete task
	const deleteTask = async (columnId, projectId, taskColumnId, taskId) => {
		const taskColumnRef = doc(
			firestore,
			`projectBoard/${userId}/columns/${columnId}/projects/${projectId}/taskColumns/${taskColumnId}/tasks/${taskId}`
		);

		await deleteDoc(taskColumnRef);
		await fetchProjectsUnderColumn(columnId);
	};

	// Edit Task
	const editTask = (task) => {
		setTaskToBeUpdated(task);
		setNewTask((prev) => ({
			...prev,
			title: task.title,
			description: task.description,
			priority: task.priority,
			list: task.list,
			status: task.status,
		}));
	};

	// CONST CANCEL
	const cancelTask = () => {
		setNewTask(initialNewTask);
	};

	// handle Update CheckList
	const handleUpdateCheckList = async () => {
		try {
			const updatedTaskData = {
				...newTask,
				id: taskToBeUpdated.id,
				columnId: taskToBeUpdated.columnId,
				taskColumnId: taskToBeUpdated.taskColumnId,
				projectId: taskToBeUpdated.projectId,
			};
			const newTaskRef = doc(
				firestore,
				`projectBoard/${userId}/columns/${updatedTaskData.columnId}/projects/${updatedTaskData.projectId}/taskColumns/${updatedTaskData.taskColumnId}/tasks/${updatedTaskData.id}`
			);
			await updateDoc(newTaskRef, updatedTaskData);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};



	// handle UPDATE Project
	const handleUpdateTask = async () => {
		setIsSubmitting(true);

		const updatedTaskData = {
			...newTask,
			id: taskToBeUpdated.id,
			columnId: taskToBeUpdated.columnId,
			taskColumnId: newTask.status.id,
			projectId: taskToBeUpdated.projectId,
		};

		try {
			if (taskToBeUpdated.taskColumnId !== updatedTaskData.taskColumnId) {
				// Delete task from the old taskColumnsId
				const taskRef = doc(
					firestore,
					`projectBoard/${userId}/columns/${taskToBeUpdated.columnId}/projects/${taskToBeUpdated.projectId}/taskColumns/${taskToBeUpdated.taskColumnId}/tasks/${taskToBeUpdated.id}`
				);
				await deleteDoc(taskRef);

				// Add to the new taskColumn
				const newTaskRef = doc(
					firestore,
					`projectBoard/${userId}/columns/${updatedTaskData.columnId}/projects/${updatedTaskData.projectId}/taskColumns/${updatedTaskData.taskColumnId}/tasks/${updatedTaskData.id}`
				);
				await setDoc(newTaskRef, updatedTaskData);
			} else {
				const newTaskRef = doc(
					firestore,
					`projectBoard/${userId}/columns/${updatedTaskData.columnId}/projects/${updatedTaskData.projectId}/taskColumns/${updatedTaskData.taskColumnId}/tasks/${updatedTaskData.id}`
				);
				await updateDoc(newTaskRef, updatedTaskData);
			}

			await fetchProjectsUnderColumn(taskToBeUpdated.columnId);
			await fetchProjectsUnderColumn(updatedTaskData.columnId);
		} catch (error) {
			console.error("Error updating task:", error);
		} finally {
			setIsSubmitting(false);
			handleModalClose();
			setNewTask(initialNewTask);
			setIsNewTaskModalOpen(false);
			setIsStatusOpen(false);
			setTaskToBeUpdated({})
		}

		setNewTask(initialNewTask);
	};

	return (
		<TaskContext.Provider
			value={{
				isNewTaskModalOpen,
				listItems,
				setListItems,
				setIsNewTaskModalOpen,
				isStatusOpen,
				setIsStatusOpen,
				handleUpdateTask,
				updatedTaskStatus,
				setUpdatedTaskStatus,
				handleUpdateCheckList,
				createNewTask,
				deleteTask,
				editTask,
				cancelTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskContext;
