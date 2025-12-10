import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns, Payment } from "./_components/columns";

export const metadata: Metadata = {
  title: "Table Test",
};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: 2,
      amount: 154,
      status: "success",
      email: "b@example.com",
    },
    // ...
  ];
}

export default async function Series() {
  const data = await getData();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto flex min-w-4xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-bold">shadcn/ui TanStack Table</h1>
          </div>
          <div className="flex h-5 items-center gap-2">
            <Button variant={"ghost"} size={"icon-sm"} asChild>
              <Link href={"/"}>
                <Home />
                <span className="sr-only">Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
