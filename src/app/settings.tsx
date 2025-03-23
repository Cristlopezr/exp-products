import { useState } from "react";
import Text from "../presentation/components/ui/text";
import View from "../presentation/components/ui/view";
import { useTheme } from "@react-navigation/native";
import { Pressable } from "react-native";
import { ThemeController } from "../config/theme/theme-controller";
import { RadioButtonOfIcon, RadioButtonOnIcon } from "../lib/icons";

type Theme = "dark" | "light" | "system";

type Option = {
  label: string;
  value: Theme;
};

const options: Option[] = [
  {
    label: "Claro",
    value: "light",
  },
  {
    label: "Oscuro",
    value: "dark",
  },
  {
    label: "Sistema",
    value: "system",
  },
];

export default function Settings() {
  const { colors, dark } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(dark ? "dark" : "light");

  const onChange = (value: Theme) => {
    setSelectedTheme(value);
    ThemeController.onChangeTheme(value);
  };

  return (
    <View className="px-5 py-10">
      <Text className="mb-5 text-lg text-background-foreground">Selecciona tu tema preferido:</Text>
      <View className="gap-5">
        {options.map(({ label, value }) => (
          <Pressable
            onPress={() => onChange(value)}
            className="flex-row items-center gap-4 rounded-lg bg-primary/10 px-4 py-5"
            key={value}
          >
            {selectedTheme === value ? (
              <RadioButtonOnIcon color={colors.primary} />
            ) : (
              <RadioButtonOfIcon color={colors.primary} />
            )}
            <Text className="text-lg">{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
