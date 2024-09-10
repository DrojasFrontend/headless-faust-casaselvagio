import * as React from "react";
const SvgComponent = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={22}
		height={21}
		fill="none"
		{...props}
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.27}
			d="M3.883 5.894H17.85M3.883 10.338H17.85M3.883 14.783H17.85"
		/>
	</svg>
);
export default SvgComponent;
