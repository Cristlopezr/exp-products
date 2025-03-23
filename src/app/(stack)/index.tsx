import Button from "../../presentation/components/ui/button";
import SearchInput from "../../presentation/components/ui/search-input";
import useGetProducts from "../../presentation/hooks/api/use-get-products";
import Loader from "../../presentation/components/ui/loader";
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import Text from "../../presentation/components/ui/text";
import { createColumnHelper } from "@tanstack/react-table";
import { Product } from "../../domain/entities/product";
import Table from "../../presentation/components/ui/table";
import { PropsWithChildren, useCallback, useState } from "react";
import { CustomTheme } from "@/src/config/theme/theme-options";
import NoData from "../../presentation/components/homeScreen/no-data";
import Error from "../../presentation/components/ui/error";
import View from "../../presentation/components/ui/view";
import { ColorValue, RefreshControl, ScrollView, ScrollViewProps } from "react-native";

const columHelper = createColumnHelper<Product>();

const columns = [
  columHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <Text>Nombre</Text>,
    sortingFn: "text",
  }),
  columHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: () => <Text>Marca</Text>,
    enableSorting: false,
  }),
  columHelper.accessor("daysToExpire", {
    cell: (info) => {
      if (info.getValue() < 0) return "No aplica";
      if (info.getValue() === 0) return "Hoy";
      if (info.getValue() === 1) return "Mañana";
      return `${info.getValue()} días`;
    },
    header: () => <Text>Vence en</Text>,
  }),
  columHelper.accessor("openDate", {
    cell: (info) => <Text>{new Date(info.getValue()).toLocaleString("es-CL")}</Text>,
    header: () => <Text>Abierto</Text>,
    sortingFn: "datetime",
  }),
  columHelper.accessor("expireDateAfterOpen", {
    cell: (info) => <Text>{new Date(info.getValue()).toLocaleString("es-CL")}</Text>,
    header: () => <Text>Vence</Text>,
    sortingFn: "datetime",
  }),
  columHelper.accessor("isExpired", {
    cell: (info) => info.getValue(),
    header: () => <Text>Estado</Text>,
    sortingFn: "text",
  }),
  columHelper.accessor("quantity", {
    cell: (info) => info.getValue(),
    header: () => <Text>Cantidad</Text>,
    enableGlobalFilter: false,
    enableSorting: false,
  }),
];

export default function Index() {
  const { error, data, isPending, refetch } = useGetProducts();
  const { colors } = useTheme() as CustomTheme;
  const [globalFilter, setGlobalFilter] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, []);

  if (isPending) {
    return <Loader color={colors.primary} size="large" />;
  }

  if (error) {
    return (
      <PullToRefresh
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        progressBackgroundColor={colors.primary}
        colors={[colors.primaryForeground]}
      >
        <View className="flex-1 px-5 py-10">
          <Error text={error.message ?? "Ha ocurrido un error, intentelo de nuevo más tarde."} />
        </View>
      </PullToRefresh>
    );
  }

  return (
    <View className="flex-1 justify-between px-5 pb-10">
      {data?.length === 0 ? (
        <PullToRefresh
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={refreshing}
          progressBackgroundColor={colors.primary}
          colors={[colors.primaryForeground]}
        >
          <NoData />
        </PullToRefresh>
      ) : (
        <PullToRefresh
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={refreshing}
          progressBackgroundColor={colors.primary}
          colors={[colors.primaryForeground]}
        >
          <SearchInput
            label="Buscar"
            placeholder="Buscar"
            className="mt-8"
            value={globalFilter}
            onChangeText={setGlobalFilter}
          />
          <Table columns={columns} data={data ?? []} setGlobalFilter={setGlobalFilter} globalFilter={globalFilter} />
        </PullToRefresh>
      )}
      <View className="pt-8">
        <Link href="/new-product" asChild>
          <Button variant="elevated">
            <Text className="text-center text-primary-foreground">Agregar producto</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}

type PullToRefreshProps = {
  refreshing: boolean;
  onRefresh: () => void;
  progressBackgroundColor?: ColorValue | undefined;
  colors?: ColorValue[] | undefined;
} & PropsWithChildren &
  ScrollViewProps;

const PullToRefresh = ({
  children,
  refreshing,
  onRefresh,
  progressBackgroundColor = "black",
  colors = ["black"],
  ...props
}: PullToRefreshProps) => {
  return (
    <ScrollView
      {...props}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={progressBackgroundColor}
          colors={colors}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {children}
    </ScrollView>
  );
};
