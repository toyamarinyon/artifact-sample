import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				rosepine: {
					base: "hsl(var(--base))",
					surface: "hsl(var(--surface))",
					overlay: "hsl(var(--overlay))",
					muted: "hsl(var(--muted))",
					subtle: "hsl(var(--subtle))",
					text: "hsl(var(--text))",
					love: "hsl(var(--love))",
					gold: "hsl(var(--gold))",
					rose: "hsl(var(--rose))",
					pine: "hsl(var(--pine))",
					foam: "hsl(var(--foam))",
					iris: "hsl(var(--iris))",
					highlightLow: "hsl(var(--highlightLow))",
					highlightMed: "hsl(var(--highlightMed))",
					highlightHigh: "hsl(var(--highlightHigh))",
				},
			},
		},
	},
	plugins: [typographyPlugin],
};
export default config;
