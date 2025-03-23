import { cn } from "@/src/lib/utils";
import { View as RNView, ViewProps } from "react-native";

type Props = {
  className?: string;
} & ViewProps;

export default function View({ className, children, ...props }: Props) {
  return (
    <RNView className={cn("bg-background", className)} {...props}>
      {children}
    </RNView>
  );
}
