/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			minHeight: {
				navScreen: "calc(100vh - 65px)",
				navScreenSpaced: "calc(100vh - 80px)",
			},
			maxHeight: {
				navScreen: "calc(100vh - 65px)",
				navScreenSpaced: "calc(100vh - 80px)",
			},
			colors: {},
			textColor: (theme) => theme("colors"),
			backgroundColor: (theme) => theme("colors"),
			borderColor: (theme) => theme("colors"),
			ringColor: (theme) => theme("colors"),
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		plugin(({ addUtilities }) => {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",
						/* Firefox */
						"scrollbar-width": "none",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},
					".scrollbar-default": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",
						/* Firefox */
						"scrollbar-width": "auto",
						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
						},
					},
				},
				["responsive"]
			);
		}),
	]
}
