import { Theme, DefaultTheme, DarkTheme as RNDarkTheme } from "@react-navigation/native";

export type CustomTheme = Theme & {
  colors: Record<ColorNames, string>;
};
type Expand<T> = { [K in keyof T]: T[K] };

type CustomColors = {
  accent: string;
  accentForeground: string;
  backgroundForeground: string;
  cardForeground: string;
  destructive: string;
  destructiveForeground: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  success: string;
  successForeground: string;
};

type ColorNames = Expand<keyof Theme["colors"] | keyof CustomColors>;

export const LightTheme: CustomTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    accentForeground: "rgb(255, 255, 255)",
    accent: "rgb(240, 98, 146)",
    backgroundForeground: "rgb(33, 33, 33)",
    background: "rgb(245, 245, 250)",
    border: "rgb(207, 216, 220)",
    cardForeground: "rgb(33 33 33)",
    card: "rgb(255, 255, 255)",
    destructiveForeground: "rgb(250, 250, 250)",
    destructive: "rgb(239, 68, 68)",
    notification: "rgb(255, 214, 102)",
    primaryForeground: "rgb(255, 255, 255)",
    primary: "rgb(98, 0, 238)",
    secondaryForeground: "rgb(255, 255, 255)",
    secondary: "rgb(3, 155, 229)",
    successForeground: "rgb(255, 255, 255)",
    success: "rgb(0, 200, 83)",
    text: "rgb(33, 33, 33)",
  },
};

export const DarkTheme: CustomTheme = {
  ...RNDarkTheme,
  dark: true,
  colors: {
    accentForeground: "rgb(255, 255, 255)",
    accent: "rgb(236, 64, 122)",
    backgroundForeground: "rgb(224, 224, 230)",
    background: "rgb(18, 18, 24)",
    border: "rgb(66, 66, 77)",
    cardForeground: "rgb(224 224 230)",
    card: "rgb(30, 30, 40)",
    destructiveForeground: "rgb(250, 250, 250)",
    destructive: "rgb(153, 42, 42)",
    notification: "rgb(255, 183, 77)",
    primaryForeground: "rgb(255, 255, 255)",
    primary: "rgb(179, 157, 219)",
    secondaryForeground: "rgb(255, 255, 255)",
    secondary: "rgb(79, 195, 247)",
    successForeground: "rgb(255, 255, 255)",
    success: "rgb(102, 187, 106)",
    text: "rgb(224, 224, 230)",
  },
};
