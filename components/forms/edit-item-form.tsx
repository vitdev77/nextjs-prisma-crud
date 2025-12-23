"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
import { editItem } from "@/actions/item.actions";
import { GreenLogo, UnitOfMeasure } from "@/generated/prisma/enums";
import { ItemWithRelations } from "@/@types/prisma";
import { underscoreWithCommas } from "@/lib/utils";

const editItemSchema = z.object({
  itemId: z.string().min(1, { message: "Item ID is required" }),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^(?! )[A-Za-z0-9]+(?: [A-Za-z0-9]+)*(?<! )$/, {
      message:
        "Name can only contain letters, numbers and spaces (only single spaces between words are allowed).",
    }),
  nameExt: z.string().optional(),
  attr: z.string().optional(),
  isMaterial: z.boolean().optional(),
  isAssembly: z.boolean().optional(),
  unitOfMeasure: z.enum(UnitOfMeasure),
  greenLogo: z.enum(GreenLogo),
  isUpdated: z.boolean(),
});

type EditItemValues = z.infer<typeof editItemSchema>;

interface Props {
  item: ItemWithRelations;
  _onSubmit?: VoidFunction;
}

export function EditItemForm({ item, _onSubmit }: Props) {
  const [error, setError] = React.useState<string | null>(null);

  const unitsOfMeasure = Object.values(UnitOfMeasure).map(
    (unitOfMeasureName, i) => ({
      id: i + 1,
      value: unitOfMeasureName,
    }),
  );
  const greenLogos = Object.values(GreenLogo).map((greenLogoName, i) => ({
    id: i + 1,
    value: greenLogoName,
  }));

  const form = useForm<EditItemValues>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
      itemId: item.id,
      name: item.name,
      nameExt: item.nameExt || "",
      attr: item.attr || "",
      isMaterial: item.isMaterial || false,
      isAssembly: item.isAssembly || false,
      unitOfMeasure: item.unitOfMeasure,
      greenLogo: item.greenLogo,
      isUpdated: item.isUpdated || true,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editItem(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Item data successfully updated");
      _onSubmit?.();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Edit item
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
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Item Name"
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
            name="nameExt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Extended (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Item Name Extended"
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
            name="attr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attribute (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Item attribute"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-input grid grid-cols-2 gap-4 rounded-lg border border-dashed">
            <FormField
              control={form.control}
              name="isMaterial"
              render={({ field }) => {
                return (
                  <FormItem className="flex w-full flex-row items-center gap-2 p-2">
                    {/* <FormLabel>Is Material</FormLabel> */}
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      Is Material
                    </FormLabel>
                    {/* <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      } // Convert string to boolean
                      defaultValue={field.value ? "true" : "false"} // Convert boolean to string for default value
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select> */}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="isAssembly"
              render={({ field }) => {
                return (
                  <FormItem className="flex w-full flex-row items-center gap-2 p-2">
                    {/* <FormLabel>Is Assembly</FormLabel> */}
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      Is Assembly
                    </FormLabel>
                    {/* <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      } // Convert string to boolean
                      defaultValue={field.value ? "true" : "false"} // Convert boolean to string for default value
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select> */}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="unitOfMeasure"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Unit of Measure</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select unit of measure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Units of measure</SelectLabel>
                          {unitsOfMeasure.map((unitsOfMeasureItem) => (
                            <SelectItem
                              key={unitsOfMeasureItem.id}
                              value={String(unitsOfMeasureItem.value)}
                            >
                              {unitsOfMeasureItem.value}
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
              name="greenLogo"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Green Logo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full" disabled={loading}>
                          <SelectValue placeholder="Select green logo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Green logos</SelectLabel>
                          {greenLogos.map((greenLogosItem) => (
                            <SelectItem
                              key={greenLogosItem.id}
                              value={String(greenLogosItem.value)}
                            >
                              {underscoreWithCommas(greenLogosItem.value)}
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

          <LoadingButton type="submit" className="w-full" loading={loading}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
