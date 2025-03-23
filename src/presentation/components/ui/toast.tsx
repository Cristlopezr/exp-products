import { useTheme } from "@react-navigation/native";
import RNToastMessage, { BaseToast, BaseToastProps, ErrorToast } from "react-native-toast-message";
import { CustomTheme } from "@/src/config/theme/theme-options";

export default function Toast() {
  const { colors } = useTheme() as CustomTheme;

  return (
    <RNToastMessage
      config={{
        success: (props: BaseToastProps) => {
          return (
            <BaseToast
              {...props}
              text1Style={{
                color: colors.text,
                fontSize: 15,
              }}
              text2Style={{
                fontSize: 13,
                color: colors.cardForeground,
              }}
              style={{
                backgroundColor: colors.card,
                borderLeftColor: colors.success,
              }}
            />
          );
        },
        error: (props) => {
          return (
            <ErrorToast
              {...props}
              text1Style={{
                color: colors.text,
                fontSize: 15,
              }}
              text2Style={{
                fontSize: 13,
                color: colors.cardForeground,
              }}
              style={{
                backgroundColor: colors.card,
                borderLeftColor: colors.destructive,
              }}
            />
          );
        },
      }}
    />
  );
}
