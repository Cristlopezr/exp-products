import Text from "./text";

type Props = {
  text: string;
};

export default function Error({ text }: Props) {
  return <Text className="text-center text-lg font-semibold text-destructive">{text}</Text>;
}
