import React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={17}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.693}
      d="M17.808 1.403H2.765c-.99 0-1.79.806-1.79 1.8v10.793c0 .993.8 1.799 1.79 1.799h15.043c.989 0 1.79-.806 1.79-1.8V3.203c0-.993-.801-1.799-1.79-1.799Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.693}
      d="m3.514 3.943 6.772 5.926 6.773-5.926"
    />
  </svg>
);
export default SvgComponent;
