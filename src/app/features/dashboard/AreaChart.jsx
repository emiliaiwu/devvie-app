import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Filler,
	Legend,

} from "chart.js";

import { Line } from "react-chartjs-2";
import { useContext } from "react";
import DashboardContext from "./DashboardContext";
import { UserPreferencesContext } from "../../context";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Filler,
    Legend,
    
);

const AreaChart = () => {
	const { topStacks, totalProjects } = useContext(DashboardContext);
	const { userPreferences } = useContext(UserPreferencesContext);
    const data = {
			labels: topStacks?.map((stack) => stack.label),
			datasets: [
				{
					label: "Projects",
					data: topStacks?.map((stack) => stack.count),
					fill: true, // To create an area chart
					backgroundColor: "rgba(240,27,244, 0.1)", // Specify the fill color
					borderColor: "rgb(240,27,244)",
				},
			],
		};

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
				text: "Top 10 Technologies",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				min: 1,
				max: totalProjects,
				title: {
					display: true,
					text: "Number of projects",
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
	return <Line data={data} options={options} />;
};

export default AreaChart;
