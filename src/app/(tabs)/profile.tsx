import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronRight, MessageCircle, Settings } from "lucide-react-native";

// import api from "../api"; // aktifkan kalau sudah ada

type Props = {
  onRoleChange?: (role: string) => void;
};

const roles = ["driver", "user", "collector"];
const NAVBAR_HEIGHT = 80;

const ProfilePage: React.FC<Props> = ({ onRoleChange }) => {
  const [role, setRole] = useState<string>("user");
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      // const res = await api.get("/");
      // setData(res.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRole = async () => {
    const saved = await AsyncStorage.getItem("role");
    if (saved) setRole(saved);
  };

  useEffect(() => {
    loadRole();
    fetchData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("role", role);
    onRoleChange?.(role);
    fetchData();
  }, [role]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 28 }}>👸</Text>
            </View>

            <View>
              <Text style={styles.name}>{data?.username ?? "Hanna"}</Text>

              <View style={styles.row}>
                <Text style={styles.smallText}>Lihat akun saya</Text>
                <ChevronRight size={12} color="#fff" />
              </View>
            </View>

            <TouchableOpacity style={styles.settingsBtn}>
              <Settings size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* MEMBER CARD */}
          <View style={styles.memberCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.memberTitle}>Member Gratis</Text>
              <Text style={styles.memberLimit}>
                Limit penjemputan: <Text style={{ color: "#000" }}>7%</Text>
              </Text>
            </View>

            <View style={styles.progressBg}>
              <View style={styles.progressFill} />
            </View>

            <Text style={styles.memberDesc}>
              Daftarkan premium member atau tingkatkan cashbackmu untuk
              mengurangi biaya layanan!
            </Text>
          </View>
        </View>

        {/* ROLE SELECT */}
        <View style={styles.roleContainer}>
          {roles.map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r)}
              style={[styles.roleBtn, role === r && styles.roleActive]}
            >
              <Text
                style={role === r ? styles.roleTextActive : styles.roleText}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* CHAT FLOAT (FIXED ABOVE NAVBAR) */}
      <View style={styles.chatFloat}>
        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>Butuh bantuan?</Text>
        </View>

        <TouchableOpacity style={styles.chatBtn}>
          <MessageCircle size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    position: "relative",
  },

  header: {
    backgroundColor: "#4d7c44",
    paddingTop: 50,
    padding: 20,
    paddingBottom: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  smallText: {
    color: "#fff",
    fontSize: 10,
    opacity: 0.8,
  },

  settingsBtn: {
    marginLeft: "auto",
  },

  memberCard: {
    position: "absolute",
    bottom: -40,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 5,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  memberTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },

  memberLimit: {
    fontSize: 10,
    color: "#666",
  },

  progressBg: {
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginTop: 8,
    overflow: "hidden",
  },

  progressFill: {
    width: "7%",
    height: "100%",
    backgroundColor: "#4d7c44",
  },

  memberDesc: {
    fontSize: 8,
    color: "#aaa",
    textAlign: "center",
    marginTop: 8,
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 60,
    gap: 8,
  },

  roleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  roleActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  roleText: {
    color: "#333",
  },

  roleTextActive: {
    color: "#fff",
  },
  // Chat float
  chatFloat: {
    position: "absolute",
    bottom: NAVBAR_HEIGHT + 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 50,
  },

  chatBubble: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },

  chatText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#555",
  },

  chatBtn: {
    backgroundColor: "#1e88e5",
    padding: 12,
    borderRadius: 30,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
