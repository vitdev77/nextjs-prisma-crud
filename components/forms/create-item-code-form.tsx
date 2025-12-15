"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { createItemCode } from "@/actions/itemCode.actions";
import { getItems } from "@/actions/item.actions";

const newItemCodeSchema = z.object({
  code: z
    .string()
    .length(14, {
      message:
        "Code must be exactly 14 characters and can only contain numbers and uppercase letters (no spaces and special characters)",
    })
    .regex(/^[A-Z0-9]*$/, {
      message:
        "Code must be exactly 14 characters and can only contain numbers and uppercase letters (no spaces and special characters)",
    }),
  itemId: z.string().nonempty("Please select an item"),
});

type NewItemCodeValues = z.infer<typeof newItemCodeSchema>;

export function CreateItemCodeForm({
  _onSubmit,
}: {
  _onSubmit?: VoidFunction;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentItemId = searchParams.get("itemId");

  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    currentItemId || "",
  );
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [items, setItems] = React.useState<
    { id: string; name: string; nameExt: string | null; attr: string | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingItemsData, setIsLoadingItemsData] = React.useState(true);

  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  React.useEffect(() => {
    async function getAllitems() {
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
    getAllitems();
  }, []);

  // Ensure the UI stays in sync if the URL changes through other means (e.g., browser back/forward)
  React.useEffect(() => {
    setSelectedValue(currentItemId || "");
  }, [currentItemId]);

  function handleValueChange(value: string) {
    setSelectedValue("");
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("itemId", value);
    } else {
      // Optional: remove the param if an empty/reset value is selected
      params.delete("itemId");
    }
    // Update the URL without a full page reload
    replace(`${pathname}?${params.toString()}`);
  }

  function removeAllQueryParams() {
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState(null, "", url.toString());
    form.reset({ itemId: "" });
  }

  const form = useForm<NewItemCodeValues>({
    resolver: zodResolver(newItemCodeSchema),
    defaultValues: {
      code: "",
      itemId: selectedValue || "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createItemCode(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New item code successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Add new item code
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          Fill all form fields. Click button below when you&apos;re done.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Item Code"
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
            name="itemId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  {isLoadingItemsData ? (
                    <div className="bg-muted text-muted-foreground/50 border-input flex h-8 w-full items-center justify-between rounded-lg border pr-2 pl-2.5 text-sm">
                      <span>Loading items list...</span>
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
                          disabled={loading || sortedItems.length === 0}
                        >
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-100">
                        <SelectGroup>
                          <SelectLabel>Items</SelectLabel>
                          {sortedItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                              <span className="text-muted-foreground">
                                {item.attr}
                              </span>
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

          {/* <FormField
            control={form.control}
            name="itemId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Item ID</FormLabel>
                  {isLoadingItemsData ? (
                    <div className="bg-muted text-muted-foreground/50 border-input flex h-8 w-full items-center justify-between rounded-lg border pr-2 pl-2.5 text-sm">
                      <span>Loading items list...</span>
                      <HugeiconsIcon
                        icon={UnfoldMoreIcon}
                        strokeWidth={2}
                        className="pointer-events-none size-4"
                      />
                    </div>
                  ) : (
                    <Combobox
                      items={sortedItems}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      {...field}
                    >
                      <ComboboxTrigger
                        render={
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal"
                          />
                        }
                      >
                        <ComboboxValue />
                      </ComboboxTrigger>
                      <ComboboxContent>
                        <ComboboxInput
                          showTrigger={false}
                          placeholder="Select item"
                          showClear
                        />
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item.id} value={item.id}>
                              {item.name}{" "}
                              <span className="text-muted-foreground text-xs">
                                {item.attr}
                              </span>
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}

          {/* <FormField
            control={form.control}
            name="itemId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Item</FormLabel>
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full justify-between"
                    >
                      {field.value
                        ? items.find((item) => item.id === field.value)?.name
                        : "Select item"}
                      <ChevronsUpDown className="ml-auto opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-83.5 p-0">
                    <Command>
                      <CommandInput placeholder="Search..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                          {items.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={String(item.id)}
                              onSelect={() => {
                                field.onChange(item.id);
                                setOpenCombobox(false);
                              }}
                            >
                              <div className="flex w-full items-center justify-between gap-2">
                                {item.name}
                                <span className="text-muted-foreground mr-2 text-xs">
                                  {item.attr}
                                </span>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value === String(item.id)
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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
              disabled={sortedItems.length === 0 || isLoadingItemsData}
            >
              Submit
            </LoadingButton>
            <Button
              onClick={removeAllQueryParams}
              disabled={
                loading || sortedItems.length === 0 || isLoadingItemsData
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
