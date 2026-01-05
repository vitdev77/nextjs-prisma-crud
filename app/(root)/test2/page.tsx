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
  { id: "react", name: "React" },
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
    <div className="bg-muted my-8 flex min-h-auto w-full flex-col items-center justify-center gap-6 rounded-2xl py-8">
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
          <div className="max-h-50 space-y-3 overflow-y-auto">
            {" "}
            {/* Using max-h and overflow for scrollability */}
            {sortedItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <Checkbox
                  id={item.id}
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(!!checked, item.id)
                  }
                />
                <Label
                  htmlFor={item.id}
                  className="flex w-full cursor-pointer flex-col items-start gap-1 py-0.5"
                >
                  {item.name}
                  <div className="text-muted-foreground">{item.id}</div>
                </Label>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className="text-muted-foreground w-full text-center text-sm">
                No items found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
