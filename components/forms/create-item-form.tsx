"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
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
import { MultiSelect } from "@/components/multi-select";
import MultipleSelector from "@/components/multi-select-2";
import { toast } from "sonner";
import { createItem, getItems } from "@/actions/item.actions";
import { GreenLogo, UnitOfMeasure } from "@/generated/prisma/enums";
import { underscoreWithCommas } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";

const categories = [
  {
    value: "clothing",
    label: "Clothing",
  },
  {
    value: "footwear",
    label: "Footwear",
  },
  {
    value: "accessories",
    label: "Accessories",
  },
  {
    value: "jewelry",
    label: "Jewelry",
    disable: true,
  },
  {
    value: "outerwear",
    label: "Outerwear",
  },
  {
    value: "fragrance",
    label: "Fragrance",
  },
  {
    value: "makeup",
    label: "Makeup",
  },
  {
    value: "skincare",
    label: "Skincare",
  },
  {
    value: "furniture",
    label: "Furniture",
  },
  {
    value: "lighting",
    label: "Lighting",
  },
  {
    value: "kitchenware",
    label: "Kitchenware",
    disable: true,
  },
  {
    value: "computers",
    label: "Computers",
  },
  {
    value: "audio",
    label: "Audio",
  },
  {
    value: "wearables",
    label: "Wearables",
  },
  {
    value: "supplements",
    label: "Supplements",
  },
  {
    value: "sportswear",
    label: "Sportswear",
  },
];

const newItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^(?! )[A-Za-z0-9]+(?: [A-Za-z0-9]+)*(?<! )$/, {
      message:
        "Name can only contain letters, numbers and spaces (only single spaces between words are allowed).",
    }),
  nameExt: z.string().optional(),
  attr: z.string().optional(),
  isMaterial: z.boolean().default(false).optional(),
  isAssembly: z.boolean().default(false).optional(),
  parts: z.array(z.string()).optional(),
  unitOfMeasure: z.enum(UnitOfMeasure),
  greenLogo: z.enum(GreenLogo),
});

const defaultValues = {
  name: "",
  nameExt: "",
  attr: "",
  isMaterial: false,
  isAssembly: false,
  unitOfMeasure: UnitOfMeasure.piece || "piece",
  greenLogo: GreenLogo.RoHS || "RoHS",
  parts: [],
};

type NewItemValues = z.infer<typeof newItemSchema>;

export function CreateItemForm({ _onSubmit }: { _onSubmit?: VoidFunction }) {
  const [items, setItems] = React.useState<
    { id: string; name: string; nameExt: string | null; attr: string | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingItemsData, setIsLoadingItemsData] = React.useState(true);

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

  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  React.useEffect(() => {
    async function getAllItems() {
      setIsLoadingItemsData(true);
      try {
        const fetchItemsData = await getItems();
        setItems(fetchItemsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingItemsData(false);
      }
    }
    getAllItems();
  }, []);

  const form = useForm<NewItemValues>({
    resolver: zodResolver(newItemSchema),
    defaultValues,
  });

  // Watch the value of the first select field
  const isAssemblyValue = form.watch("isAssembly");

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createItem(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New item successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const handleReset = () => {
    form.reset(defaultValues); // Pass the original default values
  };

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Add new item
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

          {isAssemblyValue === true && (
            <FormField
              control={form.control}
              name="parts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Parts (Items) for Assembly</FormLabel>
                  {isLoadingItemsData ? (
                    <div className="bg-muted text-muted-foreground/50 border-input flex h-8 w-full items-center justify-between rounded-lg border pr-2 pl-2.5 text-sm">
                      <span>Loading parts list...</span>
                      <HugeiconsIcon
                        icon={UnfoldMoreIcon}
                        strokeWidth={2}
                        className="pointer-events-none size-4"
                      />
                    </div>
                  ) : (
                    <FormControl>
                      {/* <MultiSelect
                        options={sortedItems}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Choose parts..."
                        disabled={loading || sortedItems.length === 0}
                      /> */}
                      {/* <MultipleSelector
                        commandProps={{
                          label: "Select parts",
                        }}
                        value={categories.slice(0, 2)}
                        defaultOptions={categories}
                        placeholder="Select parts"
                        hideClearAllButton
                        hidePlaceholderWhenSelected
                        emptyIndicator={
                          <p className="text-center text-sm">
                            No results found
                          </p>
                        }
                        className="w-full"
                      /> */}
                      <div className="dark:bg-input/30 flex max-h-76 w-full flex-col rounded-lg border bg-transparent p-2">
                        <div className="flex flex-col gap-4 overflow-y-auto">
                          {sortedItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start gap-3"
                            >
                              <Checkbox id={item.id} />
                              <div className="grid gap-1">
                                <Label
                                  htmlFor={item.id}
                                  className="flex flex-wrap gap-1"
                                >
                                  {item.name}
                                  <p className="text-muted-foreground font-mono text-xs">
                                    {item.id}
                                  </p>
                                </Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
                          <SelectLabel>Unit of measures</SelectLabel>
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

          <div className="space-y-2">
            <LoadingButton
              type="submit"
              className="w-full"
              loading={loading || isLoadingItemsData}
            >
              Submit
            </LoadingButton>
            <Button
              onClick={handleReset}
              disabled={loading || isLoadingItemsData}
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
