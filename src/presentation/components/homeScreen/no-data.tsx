import Text from "../ui/text";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/src/config/theme/theme-options";
import View from "../ui/view";
import { BoxOpenIcon } from "@/src/lib/icons";

export default function NoData() {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View className="flex-1 items-center gap-16 py-10">
      <View className="gap-5">
        <Text className="text-center text-xl font-semibold">Aún no hay productos abiertos.</Text>
        <Text className="text-center text-xl font-semibold">Agrega el primero.</Text>
      </View>

      <BoxOpenIcon size={48} color={colors.backgroundForeground} />
    </View>
  );
}
