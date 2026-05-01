import { Colors } from "@/constants/theme";
import { useNavigation, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Button from "@/components/custom-button";
import { ChevronLeft, DoorOpen } from "lucide-react-native";
import { useEffect, useState } from "react";
import { BaseTextInput, PasswordTextInput } from "@/components/custom-text-input";
import { jwtDecode } from "jwt-decode";
import { loginPassword } from "@/services/auth";
import { DecodedToken } from "@/types/auth";
import LoadingModal from "@/components/loading-modal";

export default function LoginScreen() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email"|"username" | "phone">('email');
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [focusedForm, setFocusedForm] = useState<"identifier" | "password"| null>(null)
  const [error, setError] =useState<string|null>(null)

  var identiferFormPlaceHolder = {
    "username" : "Masukkan Username Kamu",
    "email" : "Masukkan Email Kamu",
    "phone" : "Masukkan Nomor Hp Kamu",
  }
  var identiferFormLabel = {
    "username" : "Username",
    "email" : "Email",
    "phone" : "Nomor Hp",
  }

  var nextLoginMethod = {
    "email" : "username",
    "username" : "email",
    "phone" : "username",
  }

  useEffect(() => {
    setError(null)
  }, [password, loginMethod, identifier])
  const navigation = useNavigation();
  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const accessToken = await loginPassword(
        identifier,
        password,
        loginMethod
      );

      const decoded = jwtDecode<DecodedToken>(accessToken);
      const roles = decoded?.roles || [];

      if (roles.includes("ADMIN")) {
        router.push("/(tabs)");
      } else if (roles.includes("USER")) {
        router.push("/(tabs)");
      } else {
        router.push("/(tabs)");
      }
    } catch (err) {
        if (err instanceof Error) {
          setError("Login Gagal: " + err.message);
      } else {
        setError("Something unexpected happend");
      }
    } finally {
      setLoading(false)
    }

  };

  const toggleMode = () => {
    if (loginMethod == "email") {
      setLoginMethod("username");
    } else if (loginMethod === "username") {
      setLoginMethod("email");
    }

    setIdentifier('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, gap:14 }}>
      {/* Back Button */}
      <View style={{ width: '100%', paddingVertical: 14 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <ChevronLeft color={Colors.primary} />
            <Text style={{ color: Colors.primary, marginLeft: 2, fontWeight: 'bold' }}>
              Kembali
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Header */}
      <View style={{ paddingHorizontal: 30, gap: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: Colors.text }}>
          Selamat Datang Kembali!
        </Text>
        <Text style={{ fontSize: 14, color: Colors.muted }}>
          Masukkan Informasi Login Mu
        </Text>
      </View>

      {/* Form */}
      <View style={{ paddingHorizontal: 30, gap: 20 }}>

        {/* Identifier Field */}
        <BaseTextInput
          label={identiferFormLabel[loginMethod]}
          required
          value={identifier}
          onChangeText={setIdentifier}
          placeholder={identiferFormPlaceHolder[loginMethod]}
          focused={focusedForm === "identifier"}
          onFocus={() => setFocusedForm("identifier")}
          onBlur={() => setFocusedForm(null)}
          Colors={Colors}
        />

        {/* Password Field */}
        <PasswordTextInput
          label="Password"
          required
          value={password}
          onChangeText={setPassword}
          placeholder="Masukkan password kamu"
          focused={focusedForm === "password"}
          Colors={Colors}
          onFocus={() => setFocusedForm("password")}
          onBlur={() => setFocusedForm(null)}
          errorMsg={error}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:24 }}>
          <Pressable onPress={toggleMode}>
            <Text style={{ fontSize: 13, color: Colors.primary, fontWeight: '600' }}>
            Pakai {nextLoginMethod[loginMethod]}
            </Text>
          </Pressable>
          <Pressable onPress={() => {}}>
            <Text style={{ fontSize: 13, color: Colors.primary, fontWeight: '600' }}>
              Lupa Password
            </Text>
          </Pressable>
        </View>

        {/* Submit Button */}
        <Button onPress={handleSubmit}>
          <View style={{ flexDirection: 'row', gap: 7 }}>
            <DoorOpen color={Colors.textBg} size={22} />
            <Text style={{ color: Colors.textBg, fontWeight: 'bold', fontSize: 18 }}>
              Log In
            </Text>
          </View>
        </Button>

        <View style={{ marginTop: 10, flexDirection:"row", justifyContent: 'center',}}>
            <Text style={{ color: Colors.text, fontWeight: "600" }}>
              Belum punya akun? 
            </Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={{ marginLeft:6, color: Colors.primary, fontWeight: "600" }}>
              Daftar 
            </Text>
          </Pressable>
        </View>
      </View>

      <LoadingModal visible={loading} Colors={Colors} />
    </View>
  );
}
