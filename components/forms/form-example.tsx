"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/loading-button";
import { MultiSelect } from "@/components/multi-select";

const FormSchema = z.object({
  parts: z
    .array(z.string())
    .min(1, { message: "Please select at least one part." }),
});

const partsList = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

export default function FormExample() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      parts: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(`Selected: ${data.parts.join(", ")}`);
  }

  const loading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="parts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Parts</FormLabel>
              <FormControl>
                <MultiSelect
                  options={partsList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Choose parts..."
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" className="w-full" loading={loading}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
