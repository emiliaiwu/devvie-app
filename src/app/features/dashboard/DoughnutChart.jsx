import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import DashboardContext from "./DashboardContext";
import { projectStatus } from "../../data/projectData";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const { projectsInColumns } = useContext(DashboardContext);
	const backgroundColors = projectStatus.map((status) => status.color);
	const data = {
		labels: projectsInColumns?.map((col) => col.name),
		datasets: [
			{
				label: "Projects",
				data: projectsInColumns?.map((col) => col.count),
				backgroundColor: backgroundColors,
				borderColor: backgroundColors,
				weight: 1,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "60%",
		plugins: {
			layout: {
				padding: {
					right: 40,
				},
			},
			doughnutLabel: {
				labels: [
					{
						text: "Center Text",
						font: {
							size: 20,
						},
					},
				],
			},

			legend: {
				display: true,
				position: "left", // Place legend at the bottom
				labels: {
					usePointStyle: true,
					fontColor: "black", // Legend label color
					fontSize: 14,
					pointStyle: "circle",
					
				},
				padding: 20,
			},

			
		},
	};

	

	return <Doughnut data={data} options={options}  />;
};

export default DoughnutChart;
