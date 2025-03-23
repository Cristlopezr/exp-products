import { cn } from "@/src/lib/utils";
import { Text as RNText, TextProps } from "react-native";

type Props = {
  className?: string;
} & TextProps;

export default function Text({ className, ...props }: Props) {
  return <RNText className={cn("text-text", className)} {...props}></RNText>;
}
