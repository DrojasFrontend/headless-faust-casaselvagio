import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M2.67 18.817h5.874v-6.401h-2.11v-2.11h2.11V7.668a2.64 2.64 0 0 1 2.638-2.638h2.637v2.11h-2.11c-.582 0-1.055.473-1.055 1.055v2.11h3.07l-.351 2.11h-2.719v6.402h4.748a2.64 2.64 0 0 0 2.638-2.638V3.447A2.64 2.64 0 0 0 15.402.81H2.67A2.64 2.64 0 0 0 .032 3.447V16.18a2.64 2.64 0 0 0 2.638 2.638ZM1.087 3.447c0-.873.71-1.583 1.583-1.583h12.732c.873 0 1.583.71 1.583 1.583V16.18c0 .873-.71 1.583-1.583 1.583H11.71V13.47h2.557l.704-4.22h-3.26V8.194h3.165v-4.22h-3.693A3.697 3.697 0 0 0 7.49 7.667V9.25H5.38v4.221h2.11v4.29H2.67c-.873 0-1.583-.71-1.583-1.582V3.447Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.032.81H18.04v18.008H.032z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
