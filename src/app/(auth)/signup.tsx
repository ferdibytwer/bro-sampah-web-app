import { Colors } from "@/constants/theme";
import { useNavigation, useRouter } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import Button from "@/components/custom-button";
import { ChevronLeft, UserPlus } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { BaseTextInput, PasswordTextInput } from "@/components/custom-text-input";
import LoadingModal from "@/components/loading-modal";
import { signupPassword } from "@/services/auth";

export default function SignUpScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  const [loading, setLoading] = useState(false);

  // form state
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // focus state
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // field errors
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  // API error (top red box)
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setApiError(null);
  }, [fullName, username, email, password, confirmPassword]);

  const validateFields = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Username wajib diisi");
      return false
    } else setUsernameError(null);

    if (!email) {
      setEmailError("Email wajib diisi");
      return false
    } else setEmailError(null);

    if (!password) {
      setPasswordError("Password wajib diisi");
      return false
    } else setPasswordError(null);

    if (!confirmPassword) {
      setConfirmPasswordError("Konfirmasi password wajib diisi");
      valid = false;
      return false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Password tidak sama");
      return false
    } else {
      setConfirmPasswordError(null);
    }
    return true
  };

  const handleSubmit = async () => {
    setApiError(null);

    const isValid = validateFields();
    if (!isValid) return;

    setLoading(true);

    try {
      await signupPassword(
        username,
        email,
        password,
        fullName,
      );
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setApiError("Registrasi gagal: " + err.message);
      } else {
        setApiError("Terjadi kesalahan yang tidak diketahui");
      }

      // force scroll to top
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1, backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Back Button */}
      <View style={{ width: "100%", paddingVertical: 14 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
            <ChevronLeft color={Colors.primary} />
            <Text style={{ color: Colors.primary, marginLeft: 2, fontWeight: "bold" }}>
              Kembali
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Header */}
      <View style={{ paddingHorizontal: 30, gap: 10, marginBottom: 30, marginTop:20 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: Colors.text }}>
          Buat Akun Baru
        </Text>
        <Text style={{ fontSize: 14, color: Colors.muted }}>
          Isi data untuk mendaftar
        </Text>
      </View>

      {/* API ERROR BOX */}
      {apiError && (
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 15,
            padding: 12,
            backgroundColor: "#FEE2E2",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#B91C1C", fontWeight: "600" }}>
            {apiError}
          </Text>
        </View>
      )}

      {/* Form */}
      <View style={{ paddingHorizontal: 30, gap: 18 }}>

        <BaseTextInput
          label="Nama Lengkap (Opsional)"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Masukkan nama lengkap"
          focused={fullNameFocused}
          setFocused={setFullNameFocused}
          Colors={Colors}
        />

        <BaseTextInput
          label="Username"
          required
          value={username}
          onChangeText={setUsername}
          placeholder="Masukkan username"
          focused={usernameFocused}
          setFocused={setUsernameFocused}
          Colors={Colors}
          errorMsg={usernameError}
        />

        <BaseTextInput
          label="Email"
          required
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan email"
          focused={emailFocused}
          setFocused={setEmailFocused}
          Colors={Colors}
          errorMsg={emailError}
        />

        <PasswordTextInput
          label="Password"
          required
          value={password}
          onChangeText={setPassword}
          placeholder="Masukkan password"
          focused={passwordFocused}
          setFocused={setPasswordFocused}
          Colors={Colors}
          errorMsg={passwordError}
        />

        <PasswordTextInput
          label="Konfirmasi Password"
          required
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Ulangi password"
          focused={confirmPasswordFocused}
          setFocused={setConfirmPasswordFocused}
          Colors={Colors}
          errorMsg={confirmPasswordError}
        />

        {/* Submit */}
        <Button onPress={handleSubmit} style={{marginTop:20}} >
          <View style={{ flexDirection: "row", gap: 7 }}>
            <UserPlus color={Colors.textBg} size={22} />
            <Text style={{ color: Colors.textBg, fontWeight: "bold", fontSize: 18 }}>
              Daftar
            </Text>
          </View>
        </Button>

        <View style={{ marginTop: 10, flexDirection:"row", justifyContent: 'center',}}>
            <Text style={{ color: Colors.text, fontWeight: "600" }}>
              Sudah punya akun? 
            </Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={{ marginLeft:6, color: Colors.primary, fontWeight: "600" }}>
              Login 
            </Text>
          </Pressable>
        </View>
      </View>

      <LoadingModal visible={loading} Colors={Colors} />
    </ScrollView>
  );
}
