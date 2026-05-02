import React from "react";
import Svg, { Rect } from "react-native-svg";

const GridIcon = ({ size = 16, color = "currentColor" }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
    >
      <Rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="2" />
      <Rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="2" />
      <Rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="2" />
      <Rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth="2" />
    </Svg>
  );
};

export default GridIcon;
