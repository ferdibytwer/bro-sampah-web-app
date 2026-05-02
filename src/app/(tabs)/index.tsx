import GridIcon from "@/components/home-component/GridIcon";
import { MapPin, Trophy, Wallet } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DashboardPage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hi Hanna 👋</Text>
        <Text style={styles.subtitle}>
          Sudah siap mengumpulkan sampah hari ini?
        </Text>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.smallText}>Ambil sampah di:</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color="#fff" />
            <Text style={styles.locationText}>
              Gg. Mega 3, Jebres, Surakarta
            </Text>
          </View>
        </View>
      </View>

      {/* Points Card */}
      <View style={styles.pointsWrapper}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bro Sampah Points</Text>

          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.walletBox}>
                <Wallet size={32} color="#fff" />
              </View>
              <View>
                <Text style={styles.points}>5000 points</Text>
                <Text style={styles.money}>Rp5000</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.actionItem}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Wallet size={16} color="#666" />
                </TouchableOpacity>
                <Text style={styles.actionText}>Tarik Saldo</Text>
              </View>

              <View style={styles.actionItem}>
                <TouchableOpacity style={styles.iconBtn}>
                  <GridIcon size={16} color="#666" />
                </TouchableOpacity>
                <Text style={styles.actionText}>Lainnya</Text>
              </View>
            </View>
          </View>

          <Text style={styles.infoText}>
            Yuk, dapatkan lebih banyak point dengan rutin mengumpulkan sampah!
          </Text>
        </View>
      </View>

      {/* Leaderboard */}
      <View style={styles.section}>
        <View style={styles.leaderHeader}>
          <Trophy size={14} color="#fff" />
          <Text style={styles.leaderTitle}>Leaderboard Mingguan</Text>
        </View>

        <View style={styles.leaderBody}>
          <View style={styles.leaderTop}>
            {[
              { name: "Andra", points: "2.900", emoji: "👨" },
              { name: "Nana", points: "3.500", emoji: "👸", big: true },
              { name: "Ferdi", points: "3.100", emoji: "🧔" },
            ].map((item, i) => (
              <View key={i} style={styles.leaderItem}>
                <Text style={{ fontSize: 16 }}>👑</Text>
                <View style={[styles.avatar, item.big && styles.avatarBig]}>
                  <Text style={{ fontSize: item.big ? 24 : 16 }}>
                    {item.emoji}
                  </Text>
                </View>
                <Text style={styles.leaderName}>{item.name}</Text>
                <Text style={styles.leaderPoints}>{item.points} Points</Text>
              </View>
            ))}
          </View>

          {/* List */}
          <View style={{ marginTop: 10 }}>
            <View style={styles.rankItem}>
              <Text>4. Aya</Text>
              <Text>2.750 Points</Text>
            </View>
            <View style={styles.rankItem}>
              <Text>5. Nisa</Text>
              <Text>2.620 Points</Text>
            </View>

            <View style={styles.meBox}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Trophy size={18} color="#fff" style={{ opacity: 0.5 }} />
                <View>
                  <Text
                    style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}
                  >
                    10. Kamu
                  </Text>
                  <Text style={{ fontSize: 8, color: "#fff" }}>
                    1.900 Points lagi untuk menuju top 3!
                  </Text>
                </View>
              </View>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                1.600 Points
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Challenges */}
      <View style={styles.section}>
        <View style={styles.challengeBox}>
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeBadgeText}>Tantangan Minggu ini!</Text>
          </View>

          {[
            "Setor sampah 3 hari berturut-turut",
            "Ajak 2 teman pakai Bro Sampah",
            "Kumpulkan 10 kg sampah daur ulang",
          ].map((task, i) => (
            <View key={i} style={styles.taskRow}>
              <View style={styles.checkbox} />
              <Text style={styles.taskText}>{task}</Text>
            </View>
          ))}

          <View style={{ alignItems: "flex-end", marginTop: 10 }}>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={{ color: "#fff", fontSize: 10 }}>
                Ikuti Sekarang!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  header: {
    backgroundColor: "#4d7c44",
    padding: 24,
    paddingTop: 50,
    paddingBottom: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#fff", fontSize: 12, marginTop: 4, opacity: 0.9 },
  smallText: { color: "#fff", fontSize: 10, opacity: 0.8 },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  locationText: { color: "#fff", fontSize: 12 },

  pointsWrapper: {
    paddingHorizontal: 20,
    marginTop: -60,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    elevation: 5,
  },

  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },

  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  walletBox: {
    backgroundColor: "#a3c585",
    padding: 10,
    borderRadius: 16,
  },

  points: { fontSize: 18, fontWeight: "bold" },
  money: { fontSize: 11, color: "#666" },

  actionItem: { alignItems: "center", marginLeft: 10 },
  iconBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8,
  },
  actionText: { fontSize: 9, color: "#666", marginTop: 4 },

  infoText: {
    marginTop: 10,
    fontSize: 9,
    textAlign: "center",
    color: "#aaa",
  },

  section: { paddingHorizontal: 20, marginTop: 20 },

  leaderHeader: {
    backgroundColor: "#c85250",
    padding: 6,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  leaderTitle: { color: "#fff", fontSize: 11, fontWeight: "bold" },

  leaderBody: {
    backgroundColor: "#e6e6e6",
    padding: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  leaderTop: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  leaderItem: { alignItems: "center" },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: "#fcd34d",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  avatarBig: {
    width: 64,
    height: 64,
  },

  leaderName: { fontSize: 10, fontWeight: "bold" },
  leaderPoints: { fontSize: 8, color: "#555" },

  rankItem: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  meBox: {
    backgroundColor: "#c85250",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  challengeBox: {
    backgroundColor: "#a3c585",
    padding: 16,
    borderRadius: 12,
  },

  challengeBadge: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    backgroundColor: "#3b6b35",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  challengeBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: "#fff",
  },

  taskText: { color: "#fff", fontSize: 10 },

  joinBtn: {
    backgroundColor: "#3b6b35",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});
