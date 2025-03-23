import { FlatList, Pressable, ScrollView, useWindowDimensions } from "react-native";
import Text from "./text";
import {
  AccessorKeyColumnDefBase,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import View from "./view";
import { ArrowDropDownIcon, ArrowDropUpIcon, SortIcon } from "@/src/lib/icons";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/src/config/theme/theme-options";
import { Product } from "@/src/domain/entities/product";

type Props = {
  data: any[];
  columns: AccessorKeyColumnDefBase<Product, any>[];
  setGlobalFilter: (value: string) => void;
  globalFilter: string;
};

export default function Table({ data, columns, setGlobalFilter, globalFilter }: Props) {
  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    isMultiSortEvent: () => true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
  });

  const { colors } = useTheme() as CustomTheme;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-1 pb-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <View className="flex-row border-b-[1px] border-b-background-foreground py-8" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <View className="w-36 flex-1 text-center font-semibold" key={header.id}>
                {header.isPlaceholder ? null : (
                  <Pressable className="relative items-center" onPress={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort()
                      ? ({
                          asc: <ArrowDropUpIcon className="absolute -top-2 right-2" size={30} color={colors.primary} />,
                          desc: (
                            <ArrowDropDownIcon className="absolute -top-2 right-2" size={30} color={colors.primary} />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <SortIcon className="absolute -top-1 right-1" size={28} color={colors.primary} />
                        ))
                      : null}
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        ))}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={table.getRowModel().rows}
          keyExtractor={(row) => row.id}
          ListEmptyComponent={<ListEmpty />}
          renderItem={({ item: row }) => (
            <View className="flex-row border-b-[1px] border-b-background-foreground py-5">
              {row.getVisibleCells().map((cell) => (
                <Text key={cell.id} className="w-36 flex-1 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Text>
              ))}
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

function ListEmpty() {
  //TODO:Change this width
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        width: width - 33,
      }}
      className="flex-1 items-center"
    >
      <Text className="max-w-60 text-center">No hay productos que coincidan con la búsqueda.</Text>
    </View>
  );
}
