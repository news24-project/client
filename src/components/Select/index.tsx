import React, { useState } from "react";
import cls from "./Select.module.css";
import { Option, SelectProps } from "@/types";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  icon,
  style,
  iconPosition,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option);
    setOpen(false);
  };

  const selected = value || (!placeholder && options[0]) || null;
  const displayedLabel = selected?.label || placeholder;

  return (
    <div
      className={`${cls.selectWrapper} ${open ? cls.selectWrapperOpen : ""}`}
      style={style}
    >
      <div className={cls.selectHeader} onClick={() => setOpen(!open)}>
        {iconPosition === "left" && icon && (
          <span className={cls.iconLeft}>{icon}</span>
        )}
        <span>{displayedLabel}</span>
        {iconPosition === "right" && icon && (
          <span className={cls.iconRight}>{icon}</span>
        )}
      </div>

      {open && (
        <div className={cls.dropdown}>
          <ul className={cls.options}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`${cls.optionItem} ${
                  selected?.value === option.value ? cls.selected : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                <div className={cls.optionLabelWrapper}>
                  <span>{option.label}</span>
                  {selected?.value === option.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
