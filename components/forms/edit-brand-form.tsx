"use client";

import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "sonner";
import { editBrand } from "@/actions/brand.actions";
import { BrandWithRelations } from "@/@types/prisma";

const editBrandSchema = z.object({
  name: z.string().min(1, { message: "Brand name is required" }),
  brandId: z.string().min(1, { message: "Brand ID is required" }),
});

type EditBrandValues = z.infer<typeof editBrandSchema>;

interface Props {
  brand: BrandWithRelations;
  _onSubmit?: VoidFunction;
}

export function EditBrandForm({ brand, _onSubmit }: Props) {
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<EditBrandValues>({
    resolver: zodResolver(editBrandSchema),
    defaultValues: {
      name: brand.name || "",
      brandId: String(brand.id),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editBrand(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Brand data successfully updated");
      _onSubmit?.();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Edit brand
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
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brand Name"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
