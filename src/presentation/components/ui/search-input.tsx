import { cn } from "@/src/lib/utils";
import { Text, TextInput, TextInputProps } from "react-native";
import View from "./view";

type Props = {
  label: string;
  className?: string;
} & TextInputProps;

export default function SearchInput({ label, className, ...props }: Props) {
  return (
    <View className={cn("relative", className)}>
      <View className="absolute -top-3 left-3 z-10 border border-background bg-background px-1">
        <Text className="text-sm text-text">{label}</Text>
      </View>
      <TextInput
        {...props}
        className="rounded-md border border-background-foreground p-4 text-text placeholder:text-text/50"
      />
    </View>
  );
}
