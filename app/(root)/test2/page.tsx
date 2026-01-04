"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  // ... more items
];

export default function CheckboxGroupWithSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCheckedChange = (checked: boolean, id: string) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Select Frameworks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-48 space-y-3 overflow-y-auto">
            {" "}
            {/* Using max-h and overflow for scrollability */}
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleCheckedChange(!!checked, item.id)
                  }
                />
                <Label htmlFor={item.id} className="cursor-pointer">
                  {item.label}
                </Label>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className="w-full text-center text-sm text-gray-500">
                No items found.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
