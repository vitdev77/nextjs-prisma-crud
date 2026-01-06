"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";

const items = [
  { id: "d58463b5-6c18-47d5-8ba7-59a129378b16", name: "Color masterbatch" },
  { id: "next", name: "Next.js" },
  { id: "vue", name: "Vue" },
  { id: "angular", name: "Angular" },
  // ... more items
];

export default function CheckboxGroupWithSearch() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedItems = [...filteredItems].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const handleCheckedChange = (checked: boolean, id: string) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="bg-muted my-6 flex min-h-auto w-full flex-col items-center justify-center gap-6 rounded-2xl py-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Select Parts (Items) for Assembly</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <InputGroup>
              <InputGroupInput
                id="search"
                placeholder="Search item parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroupAddon>
                <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
              </InputGroupAddon>
              {searchTerm && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={handleClear}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>
          <div className="dark:bg-input/30 flex max-h-76 w-full flex-col rounded-lg border bg-transparent p-2">
            <div className="flex flex-col gap-4 overflow-y-auto">
              {sortedItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(!!checked, item.id)
                    }
                  />
                  <div className="grid gap-1">
                    <Label htmlFor={item.id} className="flex flex-wrap gap-1">
                      {item.name}
                      <p className="text-muted-foreground font-mono text-xs">
                        {item.id}
                      </p>
                    </Label>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <p className="text-muted-foreground w-full text-center text-sm">
                  No items found.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
