import { Pressable, PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/utils";

const buttonVariants = cva("px-5 py-4 rounded-full", {
  variants: {
    variant: {
      destructive: "bg-destructive active:bg-destructive/90",
      elevated: "bg-primary shadow shadow-black active:bg-primary/90",
      filled: "bg-primary active:bg-primary/90",
      outlined: "border border-primary bg-background",
      text: "bg-background",
      secondary: "bg-secondary active:bg-secondary/85",
      fab: "h-16 w-16 bg-primary flex justify-center items-center active:bg-primary/90",
    },
  },
  defaultVariants: {
    variant: "filled",
  },
});

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <Pressable ref={ref} className={cn(buttonVariants({ variant, className }))} {...props}>
        {children}
      </Pressable>
    );
  },
);

export default Button;
