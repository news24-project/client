const SunIcon = ({
  width = 64,
  height = 64,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1500 1500"
    preserveAspectRatio="xMidYMid meet"
    width={width}
    height={height}
  >
    <defs>
      <linearGradient
        id="__lottie_element_16"
        spreadMethod="pad"
        gradientUnits="userSpaceOnUse"
        x1="-231.8"
        y1="-233.332"
        x2="14.756"
        y2="20.462"
      >
        <stop offset="0%" stopColor="rgb(255,235,175)" />
        <stop offset="50%" stopColor="rgb(253,211,90)" />
        <stop offset="100%" stopColor="rgb(251,188,4)" />
      </linearGradient>

      <linearGradient
        id="__lottie_element_19"
        spreadMethod="pad"
        gradientUnits="userSpaceOnUse"
        x1="59.073"
        y1="67.527"
        x2="-116.456"
        y2="-113.585"
      >
        <stop offset="0%" stopColor="rgb(252,211,92)" stopOpacity="1" />
        <stop offset="50%" stopColor="rgb(252,211,92)" stopOpacity="0.75" />
        <stop offset="100%" stopColor="rgb(252,211,92)" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    {/* Main circle */}
    <g transform="matrix(1.4668,0,0,1.4668,1102.093,1109.719)" opacity="1">
      <g transform="matrix(1.24101,0,0,1.22081,-239.303,-245.066)">
        <path
          fill="url(#__lottie_element_16)"
          d="M0,-208.77c115.22,0,208.77,93.55,208.77,208.77S115.22,208.77,0,208.77 -208.77,115.22,-208.77,0  -115.22,-208.77,0,-208.77z"
        />
      </g>
    </g>

    {/* Rays */}
    <g transform="matrix(1.23,-0.00001,0.00001,1.23,764.212,770)" opacity="1">
      <path
        stroke="url(#__lottie_element_19)"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
        strokeMiterlimit="4"
        strokeOpacity="1"
        strokeWidth="25"
        d="M61.1,-391.84C92.87,-408.03,131.22,-395.04,147.78,-362.49L169.1,-320.63c9.47,18.61,26.66,31.63,46.57,35.26l44.77,8.19c34.82,6.37,58.54,40.36,53.58,76.85l-6.37,46.91c-2.84,20.87,3.73,41.93,17.79,57.07l31.6,33.05c24.58,26.49,24.58,68.52,0,95.01l-31.6,34.04c-14.06,15.15-20.63,36.21-17.79,57.07l6.37,46.91c4.96,36.49-18.75,70.48-53.57,76.86l-44.77,8.18c-19.9,3.63-37.09,16.65-46.56,35.26l-21.32,41.85c-16.58,32.55-54.93,45.54-86.77,29.35l-40.83-20.2c-18.17-9.25-40.42-9.25-58.57,0l-40.83,20.2c-31.84,16.19-70.19,3.2-86.78-29.35l-21.3-41.85c-9.49-18.62-26.68-31.64-46.59-35.27l-44.77-8.18c-34.82-6.38-58.53-40.37-53.57-76.86l6.37-46.91c2.84-20.86-3.73-41.92-17.78-57.07l-31.61-34.04c-24.58-26.49-24.58-68.52,0-95.01l31.61-33.05c14.05-15.14,20.62-36.2,17.78-57.07l-6.37-46.91c-4.96-36.49,18.75-70.48,53.57-76.85l44.77-8.19c19.91-3.63,37.1-16.65,46.59-35.26l21.3-41.86c16.59-32.55,54.94-45.53,86.78-29.34l40.83,20.2c18.15,9.25,40.4,9.25,58.57,0Z"
      />
    </g>
  </svg>
);

export default SunIcon;
