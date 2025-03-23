import usePostBarcodeProduct from "../../presentation/hooks/api/use-post-barcode-product";
import View from "../../presentation/components/ui/view";
import { useStore } from "../../presentation/store/store";
import { Redirect } from "expo-router";
import Error from "../../presentation/components/ui/error";
import NewBarcodeForm, { BarcodeForm } from "@/src/presentation/components/newBarcodeScreen/new-barcode-form";

export default function NewBarcodeScreen() {
  const postBarcodeProduct = usePostBarcodeProduct();
  const barcodeFromContext = useStore((state) => state.barcode);
  const openDateFromContext = useStore((state) => state.openDate);

  const { error, isPending } = postBarcodeProduct;

  if (!barcodeFromContext || !openDateFromContext) {
    <Redirect href="/" />;
    return;
  }

  const onInsertBarcodeInfo = (data: BarcodeForm) => {
    postBarcodeProduct.mutate({
      barcode: barcodeFromContext,
      name: data.name,
      quantity: data.quantity,
      daysToExpireAfterOpen: Number(data.daysToExpireAfterOpen),
      brand: Number(data.brand),
      openDate: openDateFromContext,
    });
  };

  if (error) {
    return (
      <View className="flex-1 px-5 py-10">
        <Error text={error.message ?? "Ha ocurrido un error, intentelo de nuevo más tarde."} />
      </View>
    );
  }

  return <NewBarcodeForm isPending={isPending} onSubmit={onInsertBarcodeInfo} />;
}
