import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { cn } from "./utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  onPress?: () => void;
};

const SettingsIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="settings" size={size} color={color} />
);

const MenuIcon = ({ size = 28, color = "black", className, onPress }: IconProps) => (
  <MaterialIcons className={cn(className)} onPress={onPress} name="menu" size={size} color={color} />
);

const HomeIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="home" size={size} color={color} />
);

const RadioButtonOnIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="radio-button-on" size={size} color={color} />
);

const RadioButtonOfIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="radio-button-off" size={size} color={color} />
);

const BarcodeIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialCommunityIcons className={cn(className)} name="barcode-scan" size={size} color={color} />
);

const BoxOpenIcon = ({ size = 28, color = "black" }: IconProps) => (
  <FontAwesome6 name="box-open" size={size} color={color} />
);

const ArrowDropUpIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="arrow-drop-up" size={size} color={color} />
);

const ArrowDropDownIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="arrow-drop-down" size={size} color={color} />
);

const SortIcon = ({ size = 28, color = "black", className }: IconProps) => (
  <MaterialIcons className={cn(className)} name="sort" size={size} color={color} />
);

export {
  SettingsIcon,
  MenuIcon,
  HomeIcon,
  RadioButtonOnIcon,
  RadioButtonOfIcon,
  BarcodeIcon,
  BoxOpenIcon,
  ArrowDropUpIcon,
  ArrowDropDownIcon,
  SortIcon,
};
