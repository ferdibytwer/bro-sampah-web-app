import React from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  icon: React.ReactNode;
  active: boolean;
  onPress: () => void;
};

const NavIcon: React.FC<Props> = ({ icon, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        opacity: active ? 1 : 0.5,
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default NavIcon;
