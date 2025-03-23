import "../global.css";
import { ThemeProvider } from "@react-navigation/native";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "../config/theme/theme-options";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ThemeController } from "../config/theme/theme-controller";
import DrawerNavigator from "../presentation/navigator/drawer-navigator";
import Toast from "../presentation/components/ui/toast";
import StatusBar from "../presentation/components/ui/status-bar";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, setLoaded] = useState(false);

  const setTheme = async () => {
    const theme = await ThemeController.getThemeFromStorage();
    if (!theme || Appearance.getColorScheme() === theme) {
      setLoaded(true);
      return;
    }
    Appearance.setColorScheme(theme as ColorSchemeName);
  };

  useEffect(() => {
    setTheme();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      setLoaded(true);
      subscription.remove();
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
        <StatusBar />
        <DrawerNavigator />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
