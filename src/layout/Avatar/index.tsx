import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  image?: string;
  style?: React.CSSProperties;
}

const colors = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];

function getInitials(name: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  let initials = parts[0][0];
  if (parts.length > 1) {
    initials += parts[1][0];
  }
  return initials.toUpperCase();
}

function getColorByName(name: string) {
  let code = 0;
  for (let i = 0; i < name.length; i++) {
    code += name.charCodeAt(i);
  }
  return colors[code % colors.length];
}

const Avatar: React.FC<AvatarProps> = ({ name, image, style }) => {
  if (image) {
    return <img src={image} alt={name} className={styles.avatarImg} />;
  }

  return (
    <div
      className={styles.avatar}
      style={{ backgroundColor: getColorByName(name), ...style }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
