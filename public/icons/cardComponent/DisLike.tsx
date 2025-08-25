import React from "react";

const DisLikeIcon = (props: { width?: string; height?: string }) => {
  return (
    <svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 24 24"
      focusable="false"
      fill="rgb(189, 193, 198)"
    >
      <path d="M3 17h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 24s7.09-6.85 7.17-7h5V4H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2zM17 6h3v9h-3V6zM3 13l3-7h9v10l-4.34 4.34L12 15H3v-2z"></path>
    </svg>
  );
};

export default DisLikeIcon;
