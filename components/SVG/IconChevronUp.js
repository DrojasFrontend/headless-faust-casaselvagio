import * as React from "react";
const SvgComponent = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={14}
		height={8}
		fill="none"
		{...props}
	>
		<path
			stroke="#DD8B61"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.693}
			d="m12.824 6.526-5.66-5.03-5.66 5.03"
		/>
	</svg>
);
export default SvgComponent;
