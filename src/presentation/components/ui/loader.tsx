import { ActivityIndicator, Text } from "react-native";
import View from "./view";

type Props = {
  size?: "large" | "small";
  color?: string;
};

export default function Loader({ size = "large", color = "black" }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text>
        <ActivityIndicator size={size} color={color} />;
      </Text>
    </View>
  );
}
