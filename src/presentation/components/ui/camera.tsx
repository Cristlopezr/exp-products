import { useIsFocused } from "@react-navigation/native";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import Text from "./text";
import Button from "./button";
import View from "./view";

type Props = {
  onBarcodeScanned: (scanningResult: BarcodeScanningResult) => void;
};

export default function Camera({ onBarcodeScanned }: Props) {
  const isFocused = useIsFocused();

  return (
    <View className="h-full">
      {isFocused && (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "upc_a", "upc_e"],
          }}
          onBarcodeScanned={onBarcodeScanned}
          style={{
            flex: 1,
            width: "100%",
          }}
        ></CameraView>
      )}
    </View>
  );
}

type PermissionsNotGrantedProps = {
  requestPermission: () => void;
};

export const PermissionsNotGranted = ({ requestPermission }: PermissionsNotGrantedProps) => {
  return (
    <View className="px-5 py-10">
      <Text className="text-center">Para continuar, necesitamos acceso a tu cámara.</Text>
      <Button className="mt-5" onPress={requestPermission}>
        <Text className="text-center text-primary-foreground">Dar permisos</Text>
      </Button>
    </View>
  );
};
