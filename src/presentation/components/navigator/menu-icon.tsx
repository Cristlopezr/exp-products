import { MenuIcon } from "@/src/lib/icons";
import { DrawerActions, useTheme } from "@react-navigation/native";
import { useNavigation } from "expo-router";

type Props = {
  className?: string;
};

export default function MenuIconComponent({ className }: Props) {
  const navigation = useNavigation();

  const { colors } = useTheme();
  return (
    <MenuIcon
      className={className}
      color={colors.primary}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );
}
