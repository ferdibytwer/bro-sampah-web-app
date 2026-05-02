import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { Camera, Loader2, Sparkles, X } from "lucide-react-native";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  capturedImage?: string | null;
  onCapture: () => void;
  isAnalyzing: boolean;
  aiResult?: {
    type?: string;
    tips?: string;
  } | null;
};

const AiScannerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  capturedImage,
  onCapture,
  isAnalyzing,
  aiResult,
}) => {
  const router = useRouter();

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose(); // tutup modal dulu
    }

    requestAnimationFrame(() => {
      router.replace("/");
    });
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* IMAGE AREA */}
          <View style={styles.imageBox}>
            {capturedImage ? (
              <Image source={{ uri: capturedImage }} style={styles.image} />
            ) : (
              <TouchableOpacity onPress={onCapture} style={styles.captureBtn}>
                <Camera size={48} color="#999" />
                <Text style={styles.captureText}>Ketuk untuk Foto Sampah</Text>
              </TouchableOpacity>
            )}

            {/* CLOSE */}
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <X size={18} color="#fff" />
            </TouchableOpacity>

            {/* LOADING */}
            {isAnalyzing && (
              <View style={styles.loadingOverlay}>
                <Loader2 size={32} color="#fff" />
                <Text style={styles.loadingText}>Menganalisis Material...</Text>
              </View>
            )}
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Sparkles size={18} color="#4d7c44" />
              <Text style={styles.title}>Klasifikasi AI Bro Sampah</Text>
            </View>

            {aiResult ? (
              <View style={{ gap: 10 }}>
                <View style={styles.resultBox}>
                  <Text style={styles.label}>Jenis Terdeteksi</Text>
                  <Text style={styles.resultText}>
                    {aiResult.type || "Plastik & Kertas"}
                  </Text>
                </View>

                <View style={styles.tipsBox}>
                  <Text style={styles.tipsText}>
                    "
                    {aiResult.tips ||
                      "Pisahkan plastik dan kertas untuk proses daur ulang yang lebih optimal."}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.emptyText}>
                Gunakan kamera untuk mendeteksi jenis sampah secara otomatis
                menggunakan kecerdasan buatan.
              </Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AiScannerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
  },

  imageBox: {
    height: 180,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  captureBtn: {
    alignItems: "center",
    gap: 8,
  },

  captureText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#999",
    textTransform: "uppercase",
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#fff",
    fontSize: 10,
    marginTop: 8,
    fontWeight: "bold",
  },

  content: {
    padding: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4d7c44",
  },

  resultBox: {
    backgroundColor: "#e6f4ea",
    padding: 12,
    borderRadius: 12,
  },

  label: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#3b6b35",
    textTransform: "uppercase",
  },

  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  tipsBox: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  tipsText: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#666",
  },

  emptyText: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    paddingVertical: 12,
  },
});
