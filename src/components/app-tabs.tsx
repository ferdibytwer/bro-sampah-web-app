import { Colors } from "@/constants/theme";
import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import {
  Home,
  ReceiptText,
  Search,
  Truck,
  User,
} from "lucide-react-native";

export default function AppTabs() {
  const pathname = usePathname();

  const iconColor = (route: string) =>
    pathname === route ? Colors.textBg : Colors.muted;

  const iconFill = (route: string) =>
    pathname === route ? Colors.textBg : "transparent";

  return (
    <Tabs>
      <TabSlot />

      <TabList
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
          backgroundColor: Colors.primary,
          borderRadius: 999,
          paddingVertical: 16,
          paddingHorizontal: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 999,
          elevation: 10,
        }}
      >
        <TabTrigger name="home" href="/">
          <Home
            size={24}
            color={iconColor("/")}
            fill={iconFill("/")}
          />
        </TabTrigger>

        <TabTrigger name="tasks" href="/tasks">
          <ReceiptText
            size={24}
            color={iconColor("/tasks")}
            fill={iconFill("/tasks")}
          />
        </TabTrigger>

        <TabTrigger name="delivery" href="/delivery">
          <Truck
            size={24}
            color={iconColor("/delivery")}
            fill={iconFill("/delivery")}
          />
        </TabTrigger>

        <TabTrigger name="search" href="/search">
          <Search
            size={24}
            color={iconColor("/search")}
            fill={iconFill("/search")}
          />
        </TabTrigger>

        <TabTrigger name="profile" href="/profile">
          <User
            size={24}
            color={iconColor("/profile")}
            fill={iconFill("/profile")}
          />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
