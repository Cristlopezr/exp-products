import MenuIconComponent from "@/src/presentation/components/navigator/menu-icon";
import { CustomTheme } from "@/src/config/theme/theme-options";
import { useTheme } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { BarcodeIcon } from "@/src/lib/icons";

export default function StackLayout() {
  const { colors } = useTheme() as CustomTheme;

  return (
    <Stack
      screenOptions={{
        navigationBarColor: colors.background,
        animation: "slide_from_right",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.background,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Productos",
          headerLeft: () => <MenuIconComponent className="p-2" />,
          headerRight: () => (
            <Link href="/new-barcode" className="p-2">
              <BarcodeIcon color={colors.primary} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="new-barcode"
        options={{
          headerTitle: "Código de barras",
        }}
      />
      <Stack.Screen
        name="new-barcode-product"
        options={{
          headerTitle: "Código de barras",
        }}
      />
      <Stack.Screen name="new-product" options={{ headerTitle: "Nuevo Producto" }} />
    </Stack>
  );
}
