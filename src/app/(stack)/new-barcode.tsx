import { useState } from "react";
import usePostBarcode from "../../presentation/hooks/api/use-post-barcode";
import View from "../../presentation/components/ui/view";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/src/config/theme/theme-options";
import Error from "../../presentation/components/ui/error";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import Loader from "@/src/presentation/components/ui/loader";
import Camera, { PermissionsNotGranted } from "@/src/presentation/components/ui/camera";
import NewBarcodeForm, { BarcodeForm } from "@/src/presentation/components/newBarcodeScreen/new-barcode-form";

export default function NewBarcodeScreen() {
  const { colors } = useTheme() as CustomTheme;
  const postBarcode = usePostBarcode();
  const [permission, requestPermission] = useCameraPermissions();
  const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
  const [barcode, setBarcode] = useState("");

  const { error, isPending } = postBarcode;

  const onBarcodeScanned = async (scanningResult: BarcodeScanningResult) => {
    setIsBarcodeScanned(true);
    setBarcode(scanningResult.data);
  };

  const onInsertBarcodeInfo = (data: BarcodeForm) => {
    postBarcode.mutate({
      barcode: barcode,
      name: data.name,
      quantity: data.quantity,
      daysToExpireAfterOpen: Number(data.daysToExpireAfterOpen),
      brand: Number(data.brand),
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
    return (
      <View className="flex-1 px-5 py-10">
        <Error text={error.message ?? "Ha ocurrido un error, intentelo de nuevo más tarde."} />
      </View>
    );
  }

  return <NewBarcodeForm isPending={isPending} onSubmit={onInsertBarcodeInfo} />;
}
