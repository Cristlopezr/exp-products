import { Modal as RNModal } from "react-native";
import View from "../ui/view";
import TextInput from "../ui/text-input";
import Button from "../ui/button";
import Text from "../ui/text";
import usePostNewBrand from "../../hooks/api/use-post-new-brand";
import useForm from "../../hooks/use-form";

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (state: boolean) => void;
};

type BrandName = {
  name: string;
};

const formValidations = {
  name: [
    {
      function: (value: string) => value !== "",
      message: "El nombre de la marca es obligatorio.",
    },
  ],
};

export default function Modal({ isModalVisible, setIsModalVisible }: Props) {
  const postNewBrand = usePostNewBrand();
  const { handleSubmit, formValues, onInputChange, formErrors, isFormSubmitted } = useForm<BrandName>({
    defaultValues: {
      name: "",
    },
    formValidations,
  });
  const { isPending } = postNewBrand;

  const onAddNewBrand = (data: BrandName) => {
    postNewBrand.mutate(data.name);
    setIsModalVisible(false);
  };

  return (
    <RNModal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
      <View className="flex-1 bg-background px-5 py-10">
        <TextInput
          value={formValues.name}
          placeholder="Nueva marca"
          onChangeText={(text) => onInputChange({ key: "name", value: text })}
        />
        {isFormSubmitted && formErrors["name"].length > 0 && (
          <Text className="px-2 text-destructive">{formErrors["name"][0]}</Text>
        )}
        <View className="mt-10 gap-10 px-10">
          <Button
            disabled={isPending}
            className={`${isPending ? "bg-primary/50" : "bg-primary"}`}
            onPress={() => handleSubmit(onAddNewBrand)}
          >
            {isPending ? (
              <Text className={`text-center ${isPending ? "text-primary-foreground/50" : "text-primary-foreground"}`}>
                Procesando...
              </Text>
            ) : (
              <Text className="text-center text-primary-foreground">Guardar marca</Text>
            )}
          </Button>
          <Button disabled={isPending} variant="destructive" onPress={() => setIsModalVisible(false)}>
            <Text className="text-center text-destructive-foreground">Cancelar</Text>
          </Button>
        </View>
      </View>
    </RNModal>
  );
}
