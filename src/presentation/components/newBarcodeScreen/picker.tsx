import { useTheme } from "@react-navigation/native";
import View from "../ui/view";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { CustomTheme } from "@/src/config/theme/theme-options";
import { Brand } from "@/src/domain/entities/brand";
import { formValidations } from "@/src/presentation/components/newBarcodeScreen/new-barcode-form";

type Props = {
  items: Brand[];
  selectedItem: string;
  setSelectedItem: ({ key, value }: { key: keyof typeof formValidations; value: string }) => void;
};

export default function Picker({ items, selectedItem, setSelectedItem }: Props) {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View className="overflow-hidden rounded-md border border-background-foreground">
      <RNPicker
        mode="dropdown"
        style={{
          color: colors.backgroundForeground,
          backgroundColor: colors.background,
          padding: 0,
        }}
        dropdownIconColor={colors.primary}
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem({ key: "brand", value: `${itemValue}` })}
      >
        <RNPicker.Item
          style={{
            color: colors.backgroundForeground,
            backgroundColor: colors.background,
          }}
          label="Seleccionar marca"
          value={"0"}
        />
        {items?.map(({ id, name }) => (
          <RNPicker.Item
            key={id}
            style={{
              color: colors.backgroundForeground,
              backgroundColor: colors.background,
            }}
            label={name}
            value={id}
          />
        ))}
      </RNPicker>
    </View>
  );
}
