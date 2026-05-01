import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  ActionSheetIOS,
  Animated,
  ScrollView,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, Image as ImageIcon, X, RefreshCw, Motorbike, MapPin, Wallet, Banknote, ChevronRight, Map, MotorbikeIcon } from "lucide-react-native";
import { Colors } from "@/constants/theme";
import Button from "@/components/custom-button";
import { BaseTextInput } from "@/components/custom-text-input";

type CaptureStep = "top" | "front";

const STEP_LABEL: Record<CaptureStep, string> = {
  top: "Atas",
  front: "Depan",
};

type aiResult = {
  description: string
  weightEstimation: Number
  trashTypePrediction: "non-organik" | "campuran"
}

type tpsLocation = {
  coordinate: string
  distance: string
  name: string
  address: string
}
type userLocation = {
  coordinate: string
  address: string
}

export default function Screen() {
  const [capturedImageTop, setCapturedImageTop] = useState<string | null>(null);
  const [capturedImageFront, setCapturedImageFront] = useState<string | null>(null);
  const [trashType, setTrashType] = useState("non-organik");
  const [activeModal, setActiveModal] = useState<CaptureStep | null>(null);
  const [weight, setWeight] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [driverNotes, setDriverNotes] = useState<string>('')
  const [pointEstimation, setPointEstimation] = useState<string | null>('')
  const [aiResults, setAiResults] = useState<aiResult | "loading" | "error" >("loading")
  const [aiResultsError, setAiResultsError] = useState<string | null>(null)

  const [userLocation, setUserLocation] = useState<userLocation | "loading" | "error">("loading")
  const [nearestTps, setNearestTps] = useState<tpsLocation | "loading" | "error" >("loading")

  const [userLocationError, setUserLocationError] = useState<string| null>(null)
  const [nearestTpsError, setNearestTpsError] = useState<string| null>(null)

  const [focusedForm, setFocusedForm] = useState<"weight" | "notes" | "phone" | null>(null);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (activeModal) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [activeModal]);

  const getAiResult = async() => {
    if (!capturedImageFront || !capturedImageTop) {
      return
    }
    setAiResults("loading")
    setAiResultsError(null)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res : aiResult = {
      description: "yeah",
      weightEstimation: 10,
      trashTypePrediction: "non-organik"
    }
    setWeight(String(res.weightEstimation))
    setTrashType(res.trashTypePrediction)
    setAiResults(res)
  }

  useEffect(() => {
    getAiResult()
  }, [capturedImageFront, capturedImageTop])

  const openCamera = async (step: CaptureStep) => {
    setActiveModal(null);
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) {
      step === "top"
        ? setCapturedImageTop(result.assets[0].uri)
        : setCapturedImageFront(result.assets[0].uri);
    }
  };

  const openGallery = async (step: CaptureStep) => {
    setActiveModal(null);
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
    if (!result.canceled) {
      step === "top"
        ? setCapturedImageTop(result.assets[0].uri)
        : setCapturedImageFront(result.assets[0].uri);
    }
  };

  const handlePickImage = (step: CaptureStep) => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ["Batal", "Kamera", "Galeri"], cancelButtonIndex: 0 },
        (i) => {
          if (i === 1) openCamera(step);
          if (i === 2) openGallery(step);
        }
      );
      return;
    }
    setActiveModal(step);
  };

  const bothCaptured = !!capturedImageTop && !!capturedImageFront

  const handleSubmit = async() => {
  }

  const getNearestTps = async() => {
    if (userLocation === "loading" || userLocation === "error") {
      return
    }

    setNearestTps("loading")
    setNearestTpsError(null)
    const tps: tpsLocation = {
        coordinate: "yy",
        distance: "600 m",
        name: "LPPM UNS Gandeng TPS3R Mojo Makmur",
        address: "Jl. Mojo, Jebres, Kec. Jebres, Kota Surakarta, Jawa Tengah 57126"
    }

    setNearestTps(tps)
    // setNearestTpsError("Lokasi Kamu Belum tersupport, stay tuned ya")

  }
  const getUserLocation = async() => {
    setUserLocation("loading")
    setUserLocationError(null)
    const usrloc: userLocation = {
        coordinate: "yy",
        address: "Jalan Ir. Sutami 36A Kentingan, Jebres, Surakarta, Jawa Tengah. Indonesia 57126."
    }
    setUserLocation(usrloc)
    // setUserLocationError("Nyalakan Izin Lokasi terlebih dahulu")

  }

  useEffect(() => {
    getNearestTps()
  }, [userLocation])

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
        marginBottom: 100,
        flexGrow: 1,
      }}
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            color: "#1f2937",
            marginBottom: 4,
          }}
        >
          Jemput Sampah
        </Text>

        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: "#6b7280",
            marginBottom: 10,
          }}
        >
          Pilih jenis sampah anda
        </Text>
      </View>

      <View
        style={{
          position: "relative",
          zIndex: 10,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: Colors.border,
          backgroundColor: Colors.background,
          overflow: "hidden",
          marginTop: 10,
        }}
      >
        <ImageSlot
          step="top"
          uri={capturedImageTop}
          activeModal={activeModal}
          slideAnim={slideAnim}
          onPickImage={handlePickImage}
          onCamera={openCamera}
          onGallery={openGallery}
          onCloseModal={() => setActiveModal(null)}
          borderBottom={capturedImageTop ? true : false}
        />

        {capturedImageTop && (
          <ImageSlot
            step="front"
            uri={capturedImageFront}
            activeModal={activeModal}
            slideAnim={slideAnim}
            onPickImage={handlePickImage}
            onCamera={openCamera}
            onGallery={openGallery}
            onCloseModal={() => setActiveModal(null)}
          />
        )}
      </View>

      {bothCaptured && (
        <>
          <View
            style={{
              borderRadius: 16,
              marginTop: -50,
              borderWidth: 1,
              borderColor: Colors.border,
              zIndex: 0,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ height: 50 }} />

            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 14,
                paddingRight: 24,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
            {aiResults === "loading" ? (
              <View style={{flexDirection: "row", paddingLeft:12, alignItems: "center" }}>
              <ActivityIndicator size="small" color={Colors.primary} />
              <Text style={{fontSize:12, fontWeight:"semibold", color:Colors.primary, marginLeft:12}}>
                Mengambil Analisa AI

              </Text>
              </View>
            ) : (
              <>
                <View style={{ flexDirection: "column", gap: 5 }}>
                  <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: "bold" }}>
                    Estimasi Berat Sampah:{" "}
                    <Text style={{ fontSize: 12, color: Colors.text, fontWeight: "normal" }}>
                      {aiResults === "error" ? "-" : String(aiResults?.weightEstimation ?? "-")} {" "}kg
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: "bold" }}>
                    Prediksi Jenis Sampah:{" "}
                    <Text style={{ fontSize: 12, color: Colors.text, fontWeight: "normal" }}>
                      {aiResults === "error" ? "-" : aiResults?.trashTypePrediction ?? "-"}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 12, color: Colors.primary, fontWeight: "bold" }}>
                    Deskripsi AI:{" "}
                    <Text style={{ fontSize: 12, color: Colors.text, fontWeight: "normal" }}>
                      {aiResults === "error" ? "-" : aiResults?.description ?? "-"}
                    </Text>
                  </Text>
                </View>
                <Button
                  onPress={getAiResult}
                  style={{ height: 36, paddingHorizontal: 10, borderRadius: 999, flexDirection: "row", gap: 5, backgroundColor: Colors.background, borderColor: Colors.primary, borderWidth: 1.5 }}
                >
                  <RefreshCw size={14} color={Colors.primary}  />
                </Button>
              </>

            )}
            </View>
          </View>

          {aiResults !== null && (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.primary,
                  fontWeight: "bold",
                  marginTop: 40,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Hasil Ai tidak akurat? Kamu bisa coba untuk memodifikasinya
              </Text>
              <Text style={{ fontSize: 12, color: Colors.text, fontWeight: "bold", marginTop: 40 }}>
                Pilih Jenis Sampah
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  marginTop: 8,
                  padding: 4,
                  width: 300,
                  backgroundColor: "#4d7c44",
                  borderRadius: 8,
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  onPress={() => setTrashType("non-organik")}
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: trashType === "non-organik" ? "#ffffff" : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: trashType === "non-organik" ? "#4d7c44" : "#ffffff",
                    }}
                  >
                    Sampah non-organik
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setTrashType("campuran")}
                  style={{
                    flex: 1,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: trashType === "campuran" ? "#ffffff" : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "700",
                      color: trashType === "campuran" ? "#4d7c44" : "#ffffff",
                    }}
                  >
                    Sampah campuran
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: 20, marginTop: 10 }}>
                <BaseTextInput
                  label="Berat (Kg) "
                  required
                  value={weight}
                  keyboardType="numeric"
                  onChangeText={setWeight}
                  placeholder={"10"}
                  onFocus={() => setFocusedForm("weight")}
                  focused={focusedForm === "weight"}
                  Colors={Colors}
                  style={{ width: 100 }}
                />
              </View>
            </View>
          )}
        </>
      )}

      <View style={{ marginTop: 40 }} />
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <MapPin size={20} color={Colors.primary} />
        <Text style={{ fontSize: 14 }}>{" "}Lokasi Kamu</Text>
      </View>
      <View
        style={{
          marginTop: 14,
          backgroundColor: Colors.background,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
          paddingHorizontal: 14,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        {userLocation !== "error" && (
          <Text style={{ fontSize: 12, paddingRight:10 }}>
            {userLocation === "loading" ? "Mencari Lokasi" : userLocation.address}
          </Text>
        )}
        {userLocation === "error" && (
          <Text style={{ fontSize: 12, paddingRight:10 }}>
            Tidak Ada Lokasi
          </Text>
        )}
        {userLocation === "loading" && (
          <ActivityIndicator size="small" color={Colors.primary} />
        )}
        {userLocation !== "loading" && (
          <TouchableOpacity
            onPress={getUserLocation}
            style={{
              backgroundColor: Colors.background,
              borderWidth: 2,
              paddingVertical: 8,
              paddingHorizontal:10,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderColor: Colors.primary,
            }}
          >

            <RefreshCw size={14} color={Colors.primary} />
            <Text style={{ fontSize: 12, color: Colors.primary, marginLeft:6 }}>{userLocationError === "error" ? "Ulangi" : "Ganti"}</Text>
          </TouchableOpacity>
        )}
      </View>
            {userLocationError !== null && (
              <Text
                style={{
                  color: Colors.error ?? 'red',
                  fontSize: 12,
                  marginTop: 6,
                  marginLeft:6
                }}
              >
                {userLocationError}
              </Text>
            )}

      <View style={{ marginTop: 20 }} />
      {userLocation !== "loading" && userLocation !== "error" && userLocationError === null && (
        <>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={{ fontSize: 14 }}>{" "}Lokasi TPS Terdekat</Text>
          </View>
          <View
            style={{
              marginTop: 14,
              backgroundColor: Colors.background,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 14,
              minHeight:50,
              paddingVertical:12,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            {nearestTps !== "error" && (
              <>
              {nearestTps === "loading" ? (
                <Text style={{ fontSize: 12 }}>
                  "Mencari Tps Terdekat" 
                </Text>
              ) : (
                <View style={{width:"100%"}}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex:1 }}>
                    <Map size={15} color={Colors.primary}/>
                    <Text style={{ fontSize: 12, marginLeft: 4 }}>{nearestTps.name}</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, flex:1}}>
                    <Map size={15} color={"transparent"} />
                    <Text style={{ fontSize: 12, marginLeft: 5, color: Colors.subtle }}>{nearestTps.address}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center"}}>
                    <Map size={15} color={"transparent"} />
                    <Text style={{ fontSize: 12, marginLeft: 5, color: Colors.subtle }}>Jarak: 15km</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Motorbike size={15} color={Colors.primary} />
                    <Text style={{ fontSize: 12, marginLeft: 4 }}>Estimasi Waktu Pengiriman : 4 Km</Text>
                  </View>
                </View>
              )}
              </>
            )}
              {nearestTps === "error" && (
                <Text style={{ fontSize: 12 }}>
                  "Tidak Ada Lokasi"
                </Text>
              )}
            {nearestTps === "loading" && (
              <ActivityIndicator size="small" color={Colors.primary} />
            )}
            {nearestTpsError !== null  && (
              <TouchableOpacity
                onPress={getNearestTps}
                style={{
                  backgroundColor: Colors.background,
                  borderWidth: 2,
                  paddingVertical: 8,
                  paddingHorizontal:10,
                  borderRadius: 999,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  borderColor: Colors.primary,
                }}
              >


            <RefreshCw size={14} color={Colors.primary} />
            <Text style={{ fontSize: 12, color: Colors.primary, marginLeft: 3}}> Ulangi </Text>
          </TouchableOpacity>
        )}
        

          </View>
            {nearestTpsError && (
              <Text
                style={{
                  color: Colors.error ?? 'red',
                  fontSize: 12,
                  marginTop: 6,
                  marginLeft:6
                }}
              >
                {nearestTpsError}
              </Text>
            )}
        </>
      )}
      <View style={{marginTop:20}}></View>
      <BaseTextInput
        label="Nomor WA yang dapat dihubungi "
        required
        value={phone}
        keyboardType="numeric"
        onChangeText={setPhone}
        placeholder={"0812345678"}
        onFocus={() => setFocusedForm("phone")}
        focused={focusedForm === "phone"}
        Colors={Colors}
        style={{ width: "50%" }}
      />
      <View style={{marginTop:20}}></View>
      <BaseTextInput
        label="Catatan Untuk Driver "
        value={driverNotes}
        keyboardType="numeric"
        onChangeText={setDriverNotes}
        placeholder={"sampahnya di depan pagar"}
        onFocus={() => setFocusedForm("notes")}
        focused={focusedForm === "notes"}
        Colors={Colors}
        multiline={true}
        style={{ height: 80 }}
      />
      <View style={{ marginTop: 32 }} />

      {trashType !== "non-organik" ? (
        <>
          <Text style={{ fontSize: 14, marginTop: 20 }}>Metode Pembayaran</Text>
          <TouchableOpacity
            style={{
              marginTop: 14,
              backgroundColor: Colors.background,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 50,
              paddingHorizontal: 14,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  backgroundColor: "#dcfce7",
                  padding: 8,
                  borderRadius: 12,
                }}
              >
                <Banknote size={18} color="#16a34a" />
              </View>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>Tunai</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </>

      ) : (
      <>
        <View
          style={{
            backgroundColor: Colors.blue,
            padding: 12,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <Wallet size={25} color="white" />
          <Text style={{ fontSize: 12, color: "white", flexShrink: 1 }}>
            Estimasi Bro Sampah Points:{" "}
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {pointEstimation === "" ? 0 : pointEstimation} Points
            </Text>
          </Text>
        </View>
      </>

      )}


      <Button onPress={handleSubmit} style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row", gap: 7 }}>
          <Text style={{ color: Colors.textBg, fontWeight: "bold", fontSize: 14 }}>
            Cari Driver
          </Text>
        </View>
      </Button>
    </ScrollView>
  );
}

function ImagePickerModal({
  visible,
  label,
  slideAnim,
  onCamera,
  onGallery,
  onClose,
}: {
  visible: boolean;
  label: string;
  slideAnim: Animated.Value;
  onCamera: () => void;
  onGallery: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.45)",
          justifyContent: "flex-end",
        }}
      >
        <Animated.View
          style={{
            backgroundColor: Colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 34,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: Colors.text,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Pilih Foto Bagian {label} dari Sampah
            </Text>

            {[
              { icon: <Camera size={20} color={Colors.primary} />, label: "Buka Kamera", onPress: onCamera },
              { icon: <ImageIcon size={20} color={Colors.primary} />, label: "Pilih dari Galeri", onPress: onGallery },
              { icon: <X size={20} color={Colors.error} />, label: "Batal", onPress: onClose, isCancel: true },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={item.onPress}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderColor: "#F1F1F1",
                }}
              >
                {item.icon}
                <Text style={{ fontSize: 16, color: item.isCancel ? Colors.error : Colors.text }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

function ImageSlot({
  step,
  uri,
  activeModal,
  slideAnim,
  onPickImage,
  onCamera,
  onGallery,
  onCloseModal,
  borderBottom,
}: {
  step: CaptureStep;
  uri: string | null;
  activeModal: CaptureStep | null;
  slideAnim: Animated.Value;
  onPickImage: (step: CaptureStep) => void;
  onCamera: (step: CaptureStep) => void;
  onGallery: (step: CaptureStep) => void;
  onCloseModal: () => void;
  borderBottom?: boolean;
}) {
  const label = STEP_LABEL[step];
  const isModalVisible = activeModal === step;

  return (
    <>
      {!uri ? (
        <TouchableOpacity
          onPress={() => onPickImage(step)}
          activeOpacity={0.9}
          style={{
            justifyContent: "center",
            height: 80,
            paddingHorizontal: 30,
            borderBottomWidth: uri ? 1 : 0,
            borderBottomColor: Colors.border,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Camera size={40} color="#9CA3AF" />
            <Text style={{ marginLeft: 20, fontSize: 10, fontWeight: "700", color: "#9CA3AF" }}>
              Ketuk untuk Ambil Foto Bagian {label} dari Sampah
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 16,
            borderBottomWidth: borderBottom ? 1 : 0,
            borderBottomColor: Colors.border,
          }}
        >
          <Image source={{ uri }} style={{ width: 64, height: 64, borderRadius: 8 }} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: Colors.text }}>
              Tampakan {label} Sampah
            </Text>
          </View>
          <Button
            onPress={() => onPickImage(step)}
            style={{ height: 36, paddingHorizontal: 14, borderRadius: 18 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <RefreshCw size={14} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
                Ulangi
              </Text>
            </View>
          </Button>
        </View>
      )}

      <ImagePickerModal
        visible={isModalVisible}
        label={label}
        slideAnim={slideAnim}
        onCamera={() => onCamera(step)}
        onGallery={() => onGallery(step)}
        onClose={onCloseModal}
      />
    </>
  );
}
