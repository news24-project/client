import { IconsTypes } from "@/types/icons";
import React from "react";

const LeftSwiper = ({ width, height, color }: IconsTypes) => (
  <svg
    focusable="false"
    width={width || 20}
    height={height || 20}
    color={color || "#fff"}
    fill={color || "#fff"}
    viewBox="0 0 24 24"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
  </svg>
);

export default LeftSwiper;
