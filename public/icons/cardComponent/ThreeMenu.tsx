import React from "react";

const ThreeMenuIcon = (props: { width?: string; height?: string }) => {
  return (
    <svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 24 24"
      focusable="false"
      fill="white"
    >
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
  );
};

export default ThreeMenuIcon;
