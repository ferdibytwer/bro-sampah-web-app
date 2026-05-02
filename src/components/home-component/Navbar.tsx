import React from "react";
import { StyleSheet, View } from "react-native";
import NavIcon from "./NavIcon";

import { ClipboardCheck, Home, Search, Truck, User } from "lucide-react-native";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Navbar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <NavIcon
          icon={<Home size={24} color="white" />}
          active={activeTab === "home"}
          onPress={() => setActiveTab("home")}
        />

        <NavIcon
          icon={<ClipboardCheck size={24} color="white" />}
          active={activeTab === "tasks"}
          onPress={() => setActiveTab("tasks")}
        />

        <NavIcon
          icon={<Truck size={24} color="white" />}
          active={activeTab === "delivery"}
          onPress={() => setActiveTab("delivery")}
        />

        <NavIcon
          icon={<Search size={24} color="white" />}
          active={activeTab === "ai_scan"}
          onPress={() => setActiveTab("ai_scan")}
        />

        <NavIcon
          icon={<User size={24} color="white" />}
          active={activeTab === "profile"}
          onPress={() => setActiveTab("profile")}
        />
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
  },

  navbar: {
    backgroundColor: "#3b6b35",
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    // shadow Android
    elevation: 10,
  },
});
