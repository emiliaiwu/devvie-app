import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";

import DashboardContext from "./DashboardContext";
import { UserPreferencesContext } from "../../context";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = () => {
	const { userPreferences } = useContext(UserPreferencesContext);
	const { tasksInColumns } = useContext(DashboardContext);
	const totalTasks = tasksInColumns.reduce((total, task) => {
		const count = total + task.count;
		return count;
	}, 0);

	const options = {
		responsive: true,
		animations: {
			tension: {
				duration: 1000,
				easing: "linear",
				from: 1,
				to: 0,
				loop: true,
			},
		},
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Task Activity",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				min: 0,
				max: totalTasks + 2,
				title: {
					display: true,
					text: "Number of tasks",
				},
				grid: {
					color: `${userPreferences.shade.other}`,
				},
			},

			x: {
				grid: {
					color: `${userPreferences.shade.other}`,
				},
			},
		},
	};

	const backgroundColors = tasksInColumns.map((status) => status.color);
	

	const data = {
		labels: tasksInColumns.map((status) => status.status),
		datasets: [
			{
				label: "Tasks",
				data: tasksInColumns.map((status) => status.count),
				backgroundColor: backgroundColors,
			},
		],
	};

	return <Bar data={data} options={options} />;
};

export default BarChart;
