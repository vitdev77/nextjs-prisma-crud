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
import { editSeries } from "@/actions/series.actions";
import { SeriesWithRelations } from "@/@types/prisma";

const editSeriesSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^(?! )[A-Za-z0-9]+(?: [A-Za-z0-9]+)*(?<! )$/, {
      message:
        "Name can only contain letters, numbers and spaces (only single spaces between words are allowed).",
    }),
  seriesId: z.string().min(1, { message: "Series ID is required" }),
});

type EditSeriesValues = z.infer<typeof editSeriesSchema>;

interface Props {
  series: SeriesWithRelations;
  _onSubmit?: VoidFunction;
}

export function EditSeriesForm({ series, _onSubmit }: Props) {
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<EditSeriesValues>({
    resolver: zodResolver(editSeriesSchema),
    defaultValues: {
      name: series.name || "",
      seriesId: String(series.id),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editSeries(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Series data successfully updated");
      _onSubmit?.();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Edit series
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
                <FormLabel>Series Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Series Name"
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
