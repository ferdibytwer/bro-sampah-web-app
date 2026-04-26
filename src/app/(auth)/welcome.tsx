import Button from "@/components/custom-button";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { DoorOpen, PencilLine } from "lucide-react-native";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const buttonHeight = 50
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>
          Welcome
        </ Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal:20, marginBottom: 20 }}>
        <Button 
          style={{ height: buttonHeight, borderRadius: buttonHeight/2 }}
          onPress={
            () => {
              router.push("/login")
            }
          }>
          <View style={{ flexDirection: 'row', gap:6 }}>
            <DoorOpen color={Colors.textBg}/>
            <Text style={{ color: Colors.textBg, fontWeight: "bold", fontSize:18 }}> Log In </Text>
          </View>
        </Button>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12, paddingHorizontal:20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
          <Text style={{ marginHorizontal: 10, color: '#888', fontWeight: '600' }}>OR</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        </View>
        <Button 
          style={{ height: buttonHeight, borderRadius: buttonHeight/2, backgroundColor:'white'}}
          onPress={
            () => {
              router.push("/signup")
            }
          }>
          <View style={{ flexDirection: 'row', gap:10 }}>
            <PencilLine color={Colors.primary} size={20}/>
            <Text style={{ color: Colors.primary, fontWeight: "bold", fontSize:18 }}> Daftar </Text>
          </View>
        </Button>

      </View>
    </View>
  );
}
