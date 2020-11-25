import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

const ProgressIndicator = ({ percent, radius, size }) => {
	const themeContext = useContext(ThemeContext);
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - (percent / 100) * circumference;
	return (
		<svg width={size} height={size}>
			<circle
				stroke="white"
				strokeWidth="4"
				fill="transparent"
				r={radius}
				cx="60"
				cy="60"
				style={{
					stroke: themeContext.color,
					strokeDasharray: `${circumference} ${circumference} `,
					strokeDashoffset: `${offset}`,
					transition: "stroke-dashoffset 0.35s",
					transform: "rotate(-90deg)",
					transformOrigin: "50% 50%",
				}}
			/>
		</svg>
	);
};

export default ProgressIndicator;
