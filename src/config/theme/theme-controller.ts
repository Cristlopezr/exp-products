import { Appearance } from "react-native";
import { AsyncStorageAdapter } from "../adapters/async-storage.adapter";

export class ThemeController {
  static onChangeTheme = async (theme: "dark" | "light" | "system") => {
    try {
      await AsyncStorageAdapter.setItem({ key: "theme", value: theme });
    } catch (error) {
      console.log(error);
    } finally {
      Appearance.setColorScheme(theme === "system" ? null : theme);
    }
  };

  static getThemeFromStorage = async () => {
    try {
      const theme = await AsyncStorageAdapter.getItem("theme");
      if (!theme || theme === "system") return null;
      return theme;
    } catch (error) {
      return null;
    }
  };
}
