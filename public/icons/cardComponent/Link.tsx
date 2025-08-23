import React from "react";

const LinkIcon = (props: { width?: string; height?: string }) => {
  return (
    <svg
      width={props?.width || "24"}
      height={props?.height || "24"}
      viewBox="0 0 24 24"
      focusable="false"
      fill="rgb(189, 193, 198)"
    >
      <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2z"></path>
      <path d="M8 11h8v2H8z"></path>
    </svg>
  );
};

export default LinkIcon;
