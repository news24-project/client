import React from "react";

export interface Option {
  label: string;
  value: string | number;
};


export interface SelectProps {
  value: Option | null;
  onChange: (value: Option) => void;
  options: Option[];
  placeholder?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties
  iconPosition?: "left" | "right";
}
