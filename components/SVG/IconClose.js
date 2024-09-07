import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.27}
      d="M1.37 19.323 19.571 1.122m-18.2 0 18.2 18.2"
    />
  </svg>
)
export default SvgComponent
