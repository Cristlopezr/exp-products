import Ionicons from "@expo/vector-icons/Ionicons";
import Text from "../ui/text";
import TextInput from "../ui/text-input";
import View from "../ui/view";
import Modal from "./modal-form";
import Button from "../ui/button";
import useGetBrands from "../../hooks/api/use-get-brands";
import useForm from "../../hooks/use-form";
import Picker from "./picker";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/src/config/theme/theme-options";

export type BarcodeForm = {
  name: string;
  quantity: string;
  daysToExpireAfterOpen: string;
  brand: string;
};

export const formValidations = {
  name: [
    {
      function: (value: string) => value !== "",
      message: "El nombre es obligatorio.",
    },
  ],
  quantity: [
    {
      function: (value: string) => value !== "",
      message: "La cantidad es obligatoria.",
    },
  ],
  daysToExpireAfterOpen: [
    {
      function: (value: string) => value !== "",
      message: "Debes ingresar los días de vencimiento después de abrir.",
    },
    {
      function: (value: string) => !isNaN(Number(value)),
      message: "El número de días debe ser un valor numérico válido.",
    },
  ],
  brand: [
    {
      function: (value: string) => Number(value) !== 0,
      message: "Debes seleccionar una marca.",
    },
  ],
};

type Props = {
  onSubmit: (values: BarcodeForm) => void;
  isPending: boolean;
};

export default function NewBarcodeForm({ onSubmit, isPending }: Props) {
  const { data: brands } = useGetBrands();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { colors } = useTheme() as CustomTheme;
  const { isFormSubmitted, onInputChange, formValues, formErrors, handleSubmit } = useForm<BarcodeForm>({
    defaultValues: {
      name: "",
      quantity: "",
      daysToExpireAfterOpen: "",
      brand: "0",
    },
    formValidations: formValidations,
  });

  return (
    <View className="flex-1 justify-between px-5 py-10">
      <View className="gap-5">
        <View>
          <TextInput
            value={formValues.name}
            placeholder="Nombre"
            onChangeText={(text) => {
              onInputChange({ key: "name", value: text });
            }}
          />
          {isFormSubmitted && formErrors["name"].length > 0 && (
            <Text className="px-2 text-destructive">{formErrors["name"][0]}</Text>
          )}
        </View>

        <View>
          <TextInput
            value={formValues.quantity}
            placeholder="Cantidad"
            onChangeText={(text) => {
              onInputChange({ key: "quantity", value: text });
            }}
          />
          {isFormSubmitted && formErrors["quantity"].length > 0 && (
            <Text className="px-2 text-destructive">{formErrors["quantity"][0]}</Text>
          )}
        </View>
        <View>
          <TextInput
            value={formValues.daysToExpireAfterOpen.toString()}
            placeholder="Duración (dias)"
            onChangeText={(text) => {
              onInputChange({ key: "daysToExpireAfterOpen", value: text });
            }}
          />
          {isFormSubmitted && formErrors["daysToExpireAfterOpen"].length > 0 && (
            <Text className="px-2 text-destructive">{formErrors["daysToExpireAfterOpen"][0]}</Text>
          )}
        </View>
        <View>
          <Picker items={brands ?? []} selectedItem={formValues.brand} setSelectedItem={onInputChange} />
          {isFormSubmitted && formErrors["brand"].length > 0 && (
            <Text className="px-2 text-destructive">{formErrors["brand"][0]}</Text>
          )}
        </View>
        <View className="items-center gap-2">
          <Text className="text-center">¿Agregar nueva marca?</Text>
          <Ionicons onPress={() => setIsModalVisible(true)} name="add-circle-sharp" size={40} color={colors.primary} />
        </View>
        <Modal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </View>
      <Button
        disabled={isPending}
        onPress={() => handleSubmit(onSubmit)}
        className={`${isPending ? "bg-primary/50" : "bg-primary"}`}
      >
        {isPending ? (
          <Text className={`text-center ${isPending ? "text-primary-foreground/50" : "text-primary-foreground"}`}>
            Procesando...
          </Text>
        ) : (
          <Text className="text-center text-primary-foreground">Guardar código de barras</Text>
        )}
      </Button>
    </View>
  );
}
