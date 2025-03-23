import { useTheme } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function StatusBar() {
  const { colors, dark } = useTheme();

  return <ExpoStatusBar style={dark ? "light" : "dark"} backgroundColor={colors.background} />;
}
