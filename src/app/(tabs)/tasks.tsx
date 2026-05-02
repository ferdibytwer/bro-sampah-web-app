import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { OrderCardAktivitas } from "@/components/aktivitas-component/OrderCardAktivitas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Search, Wallet } from "lucide-react-native";
// import api from "api"; Belum tau API-nya

type Order = {
  id: string;
  status: string;
};

const AktivitasPage = () => {
  const [data, setData] = useState<Order[]>([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/orders/me");
      const dt: Order[] = res.data.data;

      const role = await AsyncStorage.getItem("role");

      if (role === "collector") {
        const filtered = dt.filter((item) =>
          ["delivered", "inspected", "deposited"].includes(item.status),
        );
        setData(filtered);
      } else if (role === "driver") {
        const filtered = dt
          .filter((item) =>
            ["delivered", "inspected", "deposited"].includes(
              item.status?.toLowerCase(),
            ),
          )
          .map((item) => ({
            ...item,
            status: "delivered",
          }));

        setData(filtered);
      } else {
        setData(dt);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Aktivitas</Text>
        <Search size={20} color="#666" />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.walletBox}>
            <Wallet size={20} color="#fff" />
          </View>
          <Text style={styles.cardText}>Riwayat Withdraw</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity>
          <Text style={styles.activeTab}>Aktivitas Anda</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.inactiveTab}>Akumulasi Sampah</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <View style={styles.list}>
        {data && data.length > 0 ? (
          data.map((dt) => <OrderCardAktivitas key={dt.id} order={dt} />)
        ) : (
          <View style={styles.empty}>
            <Text>Tidak Ada Sampah</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AktivitasPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },

  card: {
    margin: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  walletBox: {
    backgroundColor: "#a3c585",
    padding: 8,
    borderRadius: 8,
  },

  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    gap: 20,
  },

  activeTab: {
    color: "#3b6b35",
    fontWeight: "bold",
    fontSize: 13,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderColor: "#3b6b35",
  },

  inactiveTab: {
    color: "#aaa",
    fontWeight: "bold",
    fontSize: 13,
    paddingBottom: 8,
  },

  list: {
    padding: 20,
    gap: 12,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});
