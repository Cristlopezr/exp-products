import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Button from "../components/ui/button";
import Text from "../components/ui/text";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { DrawerActions, useTheme } from "@react-navigation/native";
import View from "../components/ui/view";
import { CustomTheme } from "@/src/config/theme/theme-options";
import MenuIconComponent from "../components/navigator/menu-icon";
import { HomeIcon, SettingsIcon } from "@/src/lib/icons";

export default function DrawerNavigator() {
  const { colors } = useTheme() as CustomTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          drawerActiveBackgroundColor: colors.primary,
          drawerActiveTintColor: colors.primaryForeground,
          drawerInactiveTintColor: colors.backgroundForeground,
          drawerInactiveBackgroundColor: colors.background,
          drawerItemStyle: {
            borderRadius: 10,
            marginVertical: 10,
          },
        }}
        drawerContent={DrawerContent}
      >
        <Drawer.Screen
          name="(stack)"
          options={{
            drawerLabel: "Inicio",
            headerShown: false,
            drawerIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            drawerLabel: "Preferencias",
            headerTitle: "Preferencias",
            headerTitleAlign: "center",
            headerTitleStyle: {
              position: "relative",
              top: -4,
            },
            drawerIcon: ({ color }) => <SettingsIcon color={color} />,
            headerLeft: () => <MenuIconComponent className="absolute left-4 top-2 p-2" />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const DrawerContent = ({ ...props }: any) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <>
      <DrawerContentScrollView
        scrollEnabled={false}
        style={{
          backgroundColor: colors.background,
        }}
        {...props}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="px-10 py-20">
        <Button variant="elevated" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Text className="text-center text-primary-foreground">Cerrar menú</Text>
        </Button>
      </View>
    </>
  );
};
