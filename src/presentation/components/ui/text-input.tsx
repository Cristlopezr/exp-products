import { cn } from "@/src/lib/utils";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

type Props = {
  className?: string;
} & TextInputProps;

export default function TextInput({ className, ...props }: Props) {
  return (
    <RNTextInput
      className={cn("rounded-md border border-background-foreground p-5 text-text placeholder:text-text/50", className)}
      {...props}
    />
  );
}
