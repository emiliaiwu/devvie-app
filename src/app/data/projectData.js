import {
	BsFillCircleFill,
	BsFillTriangleFill,
	BsFillPatchCheckFill,
	BsFillRocketTakeoffFill,
} from "react-icons/bs";
import { FaSquare, FaPause, FaBug } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";


export const projectStatus = [
	{ status: "backlog", color: "#808080", shape: FaSquare },
	{ status: "to build", color: "#007FFF", shape: BsFillTriangleFill },
	{
		status: "in development",
		color: "rgb(255, 191, 0)",
		shape: BsFillCircleFill,
	},
	{ status: "paused", color: "#c34fff", shape: FaPause },
	{ status: "testing", color: "rgb(255, 49, 49)", shape: FaBug },
	{
		status: "completed",
		color: "rgb(11, 218, 81)",
		shape: BsFillPatchCheckFill,
	},
	{
		status: "deployed",
		color: "#F01BF4",
		shape: BsFillRocketTakeoffFill,
	},
	{
		status: "abandoned",
		color: "rgb(255, 95, 31)",
		shape: GoAlertFill,
	},
];

export const collectionColors = [
	"rgb(255, 191, 0)",
	"rgb(11, 218, 81)",
	"#F01BF4",
	"#007FFF",
	"rgb(255, 95, 31)",
	"#b30000",
	"#640cc9",
];

export const linkTags = [
	{
		title: "video",
		color: "red",
	},

	{
		title: "Article",
		color: "#007FFF",
	},
	{
		title: "Source code",
		color: "rgb(255, 95, 31)",
	},
	{
		title: "course",
		color: "#640cc9",
	},
	{
		title: "socials",
		color: "#F01BF4",
	},
	{
		title: "Coding",
		color: "green",
	},
	{
		title: "Tutorials",
		color: "rgb(95,90,246)",
	},

	{
		title: "Website",
		color: "#00b287",
	},
];

export const priorityTags = [
	{
		tag: "Critical Priority",
		background: "rgba(255,87,36,.15)",
		color: "#ff5724",
		priority: 6,
	},
	{
		tag: "High Priority",
		background: "rgba(255,152,0,.15)",
		color: "#ff9800",
		priority: 5,
	},
	{
		tag: "Medium Priority",
		background: "rgba(14,165,233,.15)",
		color: "#0ea5e9",
		priority: 4,
	},
	{
		tag: "Normal Priority",
		background: "rgba(240,0,185,.15)",
		color: "#ff57d8",
		priority: 3,
	},
	{
		tag: "Low Priority",
		background: "rgba(16,185,129,.15)",
		color: "#10b981",
		priority: 2,
	},
	{
		tag: "No Priority",
		background: "rgba(95,90,246,.15)",
		color: "rgb(95,90,246)",
		priority: 1,
	},
];



export const projectTags = [
	{ tag: "Web App", color: "#00b287" },
	{ tag: "Frontend", color: "#dc0cd3" },
	{ tag: "Backend", color: "#3914fe" },
	{ tag: "iOS", color: "#fe0039" },
	{ tag: "Android", color: "#00A9FF" },
	{ tag: "Mobile", color: "#b30000" },
	{ tag: "Website", color: "#640cc9" },
	{ tag: "Landing", color: "#0000ff" },
	{ tag: "SAAS", color: "#B9005B" },
	{ tag: "E-learning", color: "#8f2ffc" },
	{ tag: "CMS", color: "#fe8b00" },
	{ tag: "AWS", color: "#008000" },
	{ tag: "Fullstack", color: "#a30ca3" },
	{ tag: "Open source", color: "#F24C3D" },
];

export const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const monthsOfYear = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];



export const taskStatus = [
	{ status: "to do", color: "#007FFF" },
	{
		status: "in progress",
		color: "rgb(255, 191, 0)",
	},
	{
		status: "needs review",
		color: "rgb(255, 95, 31)",
	},
	{ status: "bug", color: "rgb(255, 49, 49)" },
	{
		status: "done",
		color: "rgb(11, 218, 81)",
	},
];
