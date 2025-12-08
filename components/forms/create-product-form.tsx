"use client";

import * as React from "react";
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
  const [brands, setBrands] = React.useState<
    { id: number; name: string | null }[]
  >([]);
  const [series, setSeries] = React.useState<
    { id: number; name: string | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);

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
      const fetchBrandsData = await getBrands();
      setBrands(fetchBrandsData);
    }
    async function getAllSeries() {
      const fetchSeriesData = await getSeries();
      setSeries(fetchSeriesData);
    }

    getAllBrands();
    getAllSeries();
  }, []);

  const form = useForm<NewProductValues>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      seriesAttr: SeriesAttr.NONE || "NONE",
      color: ProductColor.WHITE || "WHITE",
      displayPlaced: DisplayPlaced.ON_DOOR || "ON_DOOR",
      businessType: BusinessType.OBM || "OBM",
      brandId: "",
      seriesId: "",
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
            name="brandId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        disabled={loading || brands.length === 0}
                      >
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Brands</SelectLabel>
                        {brands.map((brand) => (
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        disabled={loading || series.length === 0}
                      >
                        <SelectValue placeholder="Select series" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Series</SelectLabel>
                        {series.map((seriesItem) => (
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
              disabled={series.length === 0 || brands.length === 0}
            >
              Submit
            </LoadingButton>
            <Button
              onClick={() => form.reset()}
              disabled={loading}
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
