import React from "react";

const SaveIcon = (props: { width?: string; height?: string }) => {
  return (
    <svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 24 24"
      focusable="false"
      fill="rgb(189, 193, 198)"
    >
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path>
    </svg>
  );
};

export default SaveIcon;
