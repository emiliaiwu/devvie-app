/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				DMSans: ["DM Sans", "sans-serif"],
				Kanit: ["Kanit", "sans-serif"],
				Syne: ["Syne", "sans-serif"],
			},
			colors: {
				white: "#ffffff",
				whiteOff: "#F6F8F8",
				blue2: "#0000FF",
				offwhite: "#F0E7FF",
				landingPrimary: "#804EFF",
				landingGrey: "#1A1A1A",
				landingGreyText: "#848482",
				authButtonColor: "rgb(11,138,25)",
			},
		},
		screens: {
			xs: "375px",
			ss: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1440px",
		},
	},
	plugins: [],
};
