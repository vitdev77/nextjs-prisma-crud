"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "sonner";
import { createProduct } from "@/actions/product.actions";
import { getBrands } from "@/actions/brand.actions";
import { getSeries } from "@/actions/series.actions";
import {
  ProductColor,
  BusinessType,
  DisplayPlaced,
  SeriesAttr,
} from "@/generated/prisma/enums";
import {
  underscoreToCapitalizedText,
  underscoreWithHyphensToUppercasedText,
} from "@/lib/utils";

const newProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^(?! )[A-Za-z0-9-]+(?: [A-Za-z0-9]+)*(?<! )$/, {
      message:
        "Name can only contain letters, numbers and spaces (only single spaces between words are allowed).",
    }),
  seriesAttr: z.enum(SeriesAttr),
  color: z.enum(ProductColor),
  displayPlaced: z.enum(DisplayPlaced),
  businessType: z.enum(BusinessType),
  brandId: z.string().nonempty("Please select brand"),
  seriesId: z.string().nonempty("Please select series"),
});

type NewProductValues = z.infer<typeof newProductSchema>;

export function CreateProductForm({ _onSubmit }: { _onSubmit?: VoidFunction }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentBrandId = searchParams.get("brandId");
  const currentSeriesId = searchParams.get("seriesId");

  const [selectedBrandValue, setSelectedBrandValue] = React.useState<
    string | undefined
  >(currentBrandId || "");
  const [selectedSeriesValue, setSelectedSeriesValue] = React.useState<
    string | undefined
  >(currentSeriesId || "");
  const [brands, setBrands] = React.useState<
    { id: string; name: string | null }[]
  >([]);
  const [series, setSeries] = React.useState<
    { id: string; name: string | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingBrandsData, setIsLoadingBrandsData] = React.useState(true);
  const [isLoadingSeriesData, setIsLoadingSeriesData] = React.useState(true);

  const sortedBrands = [...brands].sort((a, b) => {
    const strA = a.name ?? "";
    const strB = b.name ?? "";

    return strA.localeCompare(strB);
  });
  const sortedSeries = [...series].sort((a, b) => {
    const strA = a.name ?? "";
    const strB = b.name ?? "";

    return strA.localeCompare(strB);
  });

  const productSeriesAttr = Object.values(SeriesAttr).map(
    (seriesAttrName, i) => ({
      id: i + 1,
      value: seriesAttrName,
    }),
  );
  const productColors = Object.values(ProductColor).map((colorName, i) => ({
    id: i + 1,
    value: colorName,
  }));
  const productDisplayPlaced = Object.values(DisplayPlaced).map(
    (displayPlacedName, i) => ({
      id: i + 1,
      value: displayPlacedName,
    }),
  );
  const businessTypes = Object.values(BusinessType).map(
    (businessTypeName, i) => ({
      id: i + 1,
      value: businessTypeName,
    }),
  );

  React.useEffect(() => {
    async function getAllBrands() {
      setIsLoadingBrandsData(true);
      try {
        const fetchBrandsData = await getBrands();
        setBrands(fetchBrandsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingBrandsData(false);
      }
    }
    async function getAllSeries() {
      setIsLoadingSeriesData(true);
      try {
        const fetchSeriesData = await getSeries();
        setSeries(fetchSeriesData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingSeriesData(false);
      }
    }

    getAllBrands();
    getAllSeries();
  }, []);

  // Ensure the UI stays in sync if the URL changes through other means (e.g., browser back/forward)
  React.useEffect(() => {
    setSelectedSeriesValue(currentSeriesId || "");
  }, [currentSeriesId]);

  // function handleValueChange(value: string) {
  //   setSelectedSeriesValue("");
  //   const params = new URLSearchParams(searchParams);
  //   if (value) {
  //     params.set("seriesId", value);
  //   } else {
  //     // Optional: remove the param if an empty/reset value is selected
  //     params.delete("seriesId");
  //   }
  //   // Update the URL without a full page reload
  //   replace(`${pathname}?${params.toString()}`);
  // }

  function removeAllQueryParams() {
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState(null, "", url.toString());
    form.reset({ brandId: "", seriesId: "" });
  }

  const form = useForm<NewProductValues>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      seriesAttr: SeriesAttr.NONE || "NONE",
      color: ProductColor.WHITE || "WHITE",
      displayPlaced: DisplayPlaced.ON_DOOR || "ON_DOOR",
      businessType: BusinessType.OBM || "OBM",
      brandId: selectedBrandValue || "",
      seriesId: selectedSeriesValue || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createProduct(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New product successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Add new product
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          Fill all form fields. Click button below when you&apos;re done.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Name"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  {isLoadingSeriesData ? (
                    <div className="bg-muted text-muted-foreground/50 border-input flex h-8 w-full items-center justify-between rounded-lg border pr-2 pl-2.5 text-sm">
                      <span>Loading brands list...</span>
                      <HugeiconsIcon
                        icon={UnfoldMoreIcon}
                        strokeWidth={2}
                        className="pointer-events-none size-4"
                      />
                    </div>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-full"
                          disabled={loading || sortedBrands.length === 0}
                        >
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Brands</SelectLabel>
                          {sortedBrands.map((brand) => (
                            <SelectItem
                              className="flex justify-between gap-2"
                              key={brand.id}
                              value={String(brand.id)}
                            >
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="seriesId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Series</FormLabel>
                  {isLoadingSeriesData ? (
                    <div className="bg-muted text-muted-foreground/50 border-input flex h-8 w-full items-center justify-between rounded-lg border pr-2 pl-2.5 text-sm">
                      <span>Loading series list...</span>
                      <HugeiconsIcon
                        icon={UnfoldMoreIcon}
                        strokeWidth={2}
                        className="pointer-events-none size-4"
                      />
                    </div>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-full"
                          disabled={loading || sortedSeries.length === 0}
                        >
                          <SelectValue placeholder="Select series" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Series</SelectLabel>
                          {sortedSeries.map((seriesItem) => (
                            <SelectItem
                              className="flex justify-between gap-2"
                              key={seriesItem.id}
                              value={String(seriesItem.id)}
                            >
                              {seriesItem.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Colors</SelectLabel>
                          {productColors.map((productColorsItem) => (
                            <SelectItem
                              key={productColorsItem.id}
                              value={String(productColorsItem.value)}
                            >
                              {underscoreToCapitalizedText(
                                productColorsItem.value,
                              )}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="displayPlaced"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Display</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select display side" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Display side</SelectLabel>
                          {productDisplayPlaced.map(
                            (productDisplayPlacedItem) => (
                              <SelectItem
                                key={productDisplayPlacedItem.id}
                                value={String(productDisplayPlacedItem.value)}
                              >
                                {underscoreToCapitalizedText(
                                  productDisplayPlacedItem.value,
                                )}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Business Types</SelectLabel>
                          {businessTypes.map((businessTypesItem) => (
                            <SelectItem
                              key={businessTypesItem.id}
                              value={String(businessTypesItem.value)}
                            >
                              {businessTypesItem.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="seriesAttr"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Series Attribute</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select series attribute" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Series Attribute</SelectLabel>
                          {productSeriesAttr.map((productSeriesAttrItem) => (
                            <SelectItem
                              key={productSeriesAttrItem.id}
                              value={String(productSeriesAttrItem.value)}
                            >
                              {underscoreWithHyphensToUppercasedText(
                                productSeriesAttrItem.value,
                              )}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {error && (
            <div role="alert" className="text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <LoadingButton
              type="submit"
              className="w-full"
              loading={loading}
              disabled={sortedBrands.length === 0 || sortedSeries.length === 0}
            >
              Submit
            </LoadingButton>
            <Button
              onClick={removeAllQueryParams}
              disabled={
                loading ||
                sortedBrands.length === 0 ||
                sortedSeries.length === 0 ||
                isLoadingBrandsData ||
                isLoadingSeriesData
              }
              variant={"ghost"}
              className="w-full"
              type="reset"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
