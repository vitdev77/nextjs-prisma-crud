"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [items, setItems] = React.useState<
    { id: number; name: string; attr: string | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getAllitems() {
      const fetchItemsData = await getItems();
      setItems(fetchItemsData);
    }
    getAllitems();
  }, []);

  const form = useForm<NewItemCodeValues>({
    resolver: zodResolver(newItemCodeSchema),
    defaultValues: {
      code: "",
      itemId: "",
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

          {/* <FormField
            control={form.control}
            name="itemId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        disabled={loading || items.length === 0}
                      >
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Items</SelectLabel>
                        {items.map((item) => (
                          <SelectItem
                            className="flex justify-between gap-2"
                            key={item.id}
                            value={String(item.id)}
                          >
                            {item.name}{" "}
                            <span className="text-muted-foreground">
                              {item.attr}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}

          <FormField
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
                        ? items.find((item) => String(item.id) === field.value)
                            ?.attr
                        : "Select item"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-94 p-0">
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
                                field.onChange(String(item.id));
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
          />

          {error && (
            <div role="alert" className="text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <LoadingButton type="submit" className="w-full" loading={loading}>
              Submit
            </LoadingButton>
            <Button
              onClick={() => form.reset()}
              disabled={loading || items.length === 0}
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
