import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";

type RoundButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  children?: React.ReactNode; 
};

const Button: React.FC<RoundButtonProps> = ({
  onPress,
  style,
  children,
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
      ]}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3b6b35", 
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 50/2,
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

