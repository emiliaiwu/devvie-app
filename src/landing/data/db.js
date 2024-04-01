import { BsInstagram, BsTiktok, BsYoutube } from "react-icons/bs";
import {
	AnalyticsIcon,
	AuthIcon,
	CommitIcon,
	Github,
	InterfaceIcon,
	PlatformIcon,
	ProjectIcon,
	ThemeIcon,
	ToastIcon,
} from "../../app/data/icon";
import { img1, img2, img3, img4, img5, img6 } from "../../assets";
import { IoMailUnreadOutline } from "react-icons/io5";

export const navLinks = [
	{ url: "#benefits", label: "Benefits" },
	{ url: "#features", label: "Features" },
	{ url: "#how-it-works", label: "How It Works" },
];

export const devImages = [
	{
		label: "Front-end Dev.",
		image: img1,
		bgColor: "bg-pink-100",
		textColor: "text-pink-700",
		dotColor: "bg-pink-300",
	},
	{
		label: "Mobile Dev.",
		image: img2,
		bgColor: "bg-green-100",
		textColor: "text-blue-700",
		dotColor: "bg-blue-300",
	},
	{
		label: "Software Dev.",
		image: img3,
		bgColor: "bg-emerald-100",
		textColor: "text-emerald-700",
		dotColor: "bg-emerald-300",
	},
	{
		label: "Back-end Dev.",
		image: img4,
		bgColor: "bg-violet-100",
		textColor: "text-violet-700",
		dotColor: "bg-violet-300",
	},
	{
		label: "Full-Stack Dev.",
		image: img5,
		bgColor: "bg-orange-100",
		textColor: "text-orange-700",
		dotColor: "bg-orange-300",
	},
	{
		label: "Game Dev.",
		image: img6,
		bgColor: "bg-teal-100",
		textColor: "text-teal-700",
		dotColor: "bg-teal-300",
	},
];

export const benefits = [
	{
		url: "https://streamable.com/e/ql5y51?autoplay=1&nocontrols=1",
		accent: "Manage",
		background: "rgba(240,0,185,.15)",
		color: "#ff57d8",
		title: "Seamless Project Management.",
		paragraph:
			"Effortlessly create, track and organize your projects and tasks, increasing your chances of landing that dream job with a stellar portfolio of accomplishments.",
	},

	{
		url: "https://streamable.com/e/hkf3ox?autoplay=1&nocontrols=1",
		accent: "Customize",
		background: "rgba(255,87,36,.15)",
		color: "#ff5724",
		title: "Appearance Customization",
		paragraph:
			"Personalize your workspace to match your style. Experiment with different styles, colors, fonts, and modes to create an environment that enhances your creativity and focus.",
	},

	{
		url: "https://streamable.com/e/ye4cun?autoplay=1&nocontrols=1",
		accent: "Track",
		background: "rgba(16,185,129,.15)",
		color: "#10b981",
		title: "Analytics for Growth.",
		paragraph:
			"Gain valuable insights into your coding habits with Devvie's analytics feature. Identify your most-used technologies and track overall task completion, allowing you to refine your skills and work more efficiently.",
	},

	{
		url: "https://streamable.com/e/pxj6o7?autoplay=1&nocontrols=1",
		accent: "Save",
		background: "rgba(14,165,233,.15)",
		color: "#0ea5e9",
		title: "Link Collections for Easy Reference.",
		paragraph:
			"Save and organize relevant links with ease. No more digging through bookmarks or notes. Devvie's link collections keep your resources at your fingertips, streamlining your workflow.",
	},

	{
		url: "https://streamable.com/e/jvqm3f?autoplay=1&nocontrols=1",
		accent: "Showcase",
		background: "rgba(95,90,246,.15)",
		color: "rgb(95,90,246)",
		title: "Profile Publication.",
		paragraph:
			"Elevate your chances of landing your dream job by showcasing your projects. Devvie empowers you to build a compelling portfolio that speaks volumes about your coding skills and potential. Publish your profile and showcase your projects and skills.",
	},
];

export const features = [
	{
		icon: ProjectIcon,
		title: "Project Management",
		paragraph:
			"Track and manage your projects effortlessly. Create tasks, track, set priorities, and complete projects.",
	},

	{
		icon: AnalyticsIcon,
		title: "Analytics for Growth",
		paragraph:
			"Gain insights into your most-used technologies. Track overall task and project progress.",
	},
	{
		icon: CommitIcon,
		title: "Commit Tracking",
		paragraph:
			"Stay updated on your project's commits in real-time, always in the know about the latest progress.",
	},
	{
		icon: InterfaceIcon,
		title: "Intuitive Interface",
		paragraph:
			"Spend more time coding and less time figuring out how to use the app with Devvie's intuitive interface.",
	},

	{
		icon: AuthIcon,
		title: "User Authentication",
		paragraph:
			"Devvie prioritizes your privacy, ensuring that your project details and personal info. are protected.",
	},

	{
		icon: PlatformIcon,
		title: "Responsive Design",
		paragraph:
			"Access Devvie from any device. Enjoy a smooth and intuitive experience on the go.",
	},

	{
		icon: ToastIcon,
		title: "Custom Toast Alerts",
		paragraph:
			"Devvie ensures you're promptly informed about errors, important info, and other key updates.",
	},

	{
		icon: ThemeIcon,
		title: "Customizable Design",
		paragraph:
			"Choose from a variety of border styles, colors, fonts, and modes. Customize to match your taste.",
	},
];

export const myLinks = [
	{
		icon: IoMailUnreadOutline,
		url: "emiliaiwucgmail.com",
	},

	{
		icon: BsTiktok,
		url: "https://www.tiktok.com/@emiliaverse",
	},

	{
		icon: Github,
		url: "https://github.com/emiliaiwu",
	},

	{
		icon: BsYoutube,
		url: "https://www.youtube.com/channel/UCJm99i9EOkrnwrNOygKlMuA",
	},

	{
		icon: BsInstagram,
		url: "https://www.instagram.com/emiliacodes/",
	},
];
