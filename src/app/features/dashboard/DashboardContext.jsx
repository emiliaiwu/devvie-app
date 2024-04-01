import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { ProjectContext } from "../../context";

const DashboardContext = createContext();
export const DashboardContextProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const { columns } = useContext(ProjectContext);
	const [firstName, setFirstName] = useState("");
	const [totalProjects, setTotalProjects] = useState(0);
	const [projectsInColumns, setProjectsInColumns] = useState([]);
	const [topStacks, setTopStacks] = useState([]);
	const [activeTasks, setActiveTasks] = useState([]);
	const [tasksInColumns, setTaskInColumns] = useState([]);
	const [taskGroup, setTaskGroup] = useState({});
	const [hasProjects, setHasProjects] = useState(false);

	useEffect(() => {
		const getUsernameOrEmail = () => {
			if (!user) {
				return "User is not logged in.";
			}

			if (user.displayName !== null) {
				setFirstName(user.displayName.split(" ")[0]);
			}
		};

		getUsernameOrEmail();
	}, [user]);

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	useEffect(() => {
		const newTotalProjects = columns.reduce(
			(total, col) => total + col.projects.length,
			0
		);
		setTotalProjects(newTotalProjects);

		const newProjectsInColumns = columns.map((col, index) => ({
			id: index,
			name: col.title,
			count: col.projects.length,
		}));
		setProjectsInColumns(newProjectsInColumns);

		const newTaskInColumns = columns?.flatMap((column) =>
			column.projects?.flatMap((project) => project.taskColumns)
		);

		// Group tasks by status
		const taskGroups = newTaskInColumns?.reduce((groups, task) => {
			const status = task.status;

			if (!groups[status]) {
				groups[status] = [];
			}

			groups[status].push(task);

			return groups;
		}, {});

		

		const newTaskGroup = Object.keys(taskGroups ?? {}).map((status) => ({
			status: status,
			color: taskGroups?.[status]?.[0]?.color ?? "#000000", // Default color if not available
			count:
				taskGroups?.[status]?.reduce?.(
					(total, task) => total + (task.tasks?.length ?? 0),
					0
				) ?? 0, // Default count if not available
		}));



		setTaskInColumns(newTaskGroup);

		// Group tasks by status
		const taskPageCol = Object.keys(taskGroups).map((status) => ({
			status: status,
			color: taskGroups[status][0].color,
			order: taskGroups[status][0].order,
			tasks: taskGroups[status].flatMap((task) => task.tasks),
		}));

		setTaskGroup(taskPageCol);

		// Get the top 10 tech stack
		const allStacks = columns?.flatMap((column) =>
			column.projects.flatMap((project) => project.stack)
		);

		// Calculate the count for each stack
		const stackCounts = allStacks
			? allStacks.reduce((counts, stack) => {
					counts[stack] = (counts[stack] || 0) + 1;
					return counts;
			  }, {})
			: {};

		// Convert the stackCounts object to an array of objects
		const sortedStacks = Object.entries(stackCounts)
			.sort(([, countA], [, countB]) => countB - countA)
			.slice(0, 10)
			.map(([stack, count]) => ({ label: stack, count }));

		const stacks = shuffleArray(sortedStacks);
		setTopStacks(stacks);

		// get the active tasks
		const allactiveTasks = columns?.flatMap((column) =>
			column?.projects.flatMap((project) =>
				project?.taskColumns.flatMap((taskCol) => taskCol?.tasks)
			)
		);

		setActiveTasks(allactiveTasks);
		setHasProjects(
			columns.some(
				(col) => Array.isArray(col.projects) && col.projects.length > 0
			)
		);
	}, [columns]);

	// Function to calculate the percentage of true checked items
	const calculatePercentage = (list) => {
		const totalTasks = list?.length;
		const trueCheckedTasks = list?.filter((item) => item?.checked)?.length;
		const percentage = (trueCheckedTasks / totalTasks) * 100;
		return percentage?.toFixed(0);
	};

	// Mapping the data to a new array with title and percentage
	const activeTasksWithPercent = activeTasks?.map((task) => ({
		title: task?.title,
		percentageChecked: calculatePercentage(task?.list),
	}));

	const activeTasksWithPercentage = activeTasksWithPercent?.filter(
		(task) => task?.percentageChecked !== "0"
	);

	return (
		<DashboardContext.Provider
			value={{
				firstName,
				totalProjects,
				projectsInColumns,
				topStacks,
				activeTasksWithPercentage,
				tasksInColumns,
				taskGroup,
				hasProjects,
				// activeProjectsWithPercentage,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardContext;
