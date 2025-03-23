import { useTheme } from "@react-navigation/native";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import usePostProduct from "../../presentation/hooks/api/use-post-product";
import Loader from "../../presentation/components/ui/loader";
import Button from "../../presentation/components/ui/button";
import { CustomTheme } from "@/src/config/theme/theme-options";
import Error from "../../presentation/components/ui/error";
import Camera, { PermissionsNotGranted } from "../../presentation/components/ui/camera";
import Text from "../../presentation/components/ui/text";
import View from "../../presentation/components/ui/view";
import { Link } from "expo-router";
import { useStore } from "../../presentation/store/store";
import { AxiosError } from "axios";
import { CustomError } from "@/src/infrastructure/api/custom-error";

export default function NewProduct() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const postProduct = usePostProduct();
  const { colors } = useTheme() as CustomTheme;
  const setBarcode = useStore((state) => state.setBarcode);
  const setOpenDate = useStore((state) => state.setOpenDate);

  const { isPending, isSuccess, error } = postProduct;

  const onBarcodeScanned = async (scanningResult: BarcodeScanningResult) => {
    setIsBarcodeScanned(true);
    const date = new Date();
    setBarcode(scanningResult.data);
    setOpenDate(date);
    postProduct.mutate({
      barcode: scanningResult.data,
      openDate: date,
    });
  };

  if (!permission || isPending) {
    return <Loader color={colors.primary} size="large" />;
  }

  if (!permission.granted) {
    return <PermissionsNotGranted requestPermission={requestPermission} />;
  }

  if (!isBarcodeScanned) {
    return <Camera onBarcodeScanned={onBarcodeScanned} />;
  }

  if (error) {
    if (error instanceof CustomError) {
      return error.status === 404 ? (
        <View className="flex-1 items-center gap-10 px-5 py-10">
          <View className="gap-2">
            <Text className="text-center">El código de barras del producto no existe.</Text>
            <Text className="text-center">¿Deseas agregarlo manualmente?</Text>
          </View>
          <View className="gap-5">
            <Link href="/new-barcode-product" replace asChild>
              <Button>
                <Text className="text-primary-foreground">Agregar código de barras</Text>
              </Button>
            </Link>
            <Link href="/" asChild dismissTo>
              <Button variant="outlined">
                <Text className="text-center text-text">No gracias, Ir atras.</Text>
              </Button>
            </Link>
          </View>
        </View>
      ) : (
        <View className="flex-1 px-5 py-10">
          <Error text={error.message ?? "Ha ocurrido un error, intentelo de nuevo más tarde."} />
        </View>
      );
    }
    return (
      <View className="flex-1 px-5 py-10">
        <Error text={error.message ?? "Ha ocurrido un error, intentelo de nuevo más tarde."} />
      </View>
    );
  }

  return null;
}
