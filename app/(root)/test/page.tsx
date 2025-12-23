"use client";

import * as React from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Tick02Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

const frameworks = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Nextjs" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "VueJS" },
  { value: "django", label: "Django" },
  { value: "astro", label: "Astro" },
  { value: "remix", label: "Remix" },
  { value: "svelte", label: "Svelte" },
  { value: "solidjs", label: "SolidJS" },
  { value: "qwik", label: "Qwik" },
];

const ComboboxMultipleDemo = () => {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([
    "london",
    "react",
  ]);

  const toggleSelection = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const removeSelection = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  return (
    <div>
      <div className="w-full max-w-xs space-y-2">
        <Label htmlFor={id}>Multiple combobox</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
            >
              <div className="my-1 grid grid-cols-3 items-center gap-1">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => {
                    const framework = frameworks.find((c) => c.value === val);

                    return framework ? (
                      <Badge
                        key={val}
                        variant="outline"
                        className="flex w-full justify-between gap-1 rounded-sm"
                      >
                        {framework.label}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(val);
                          }}
                          asChild
                        >
                          <span>
                            <HugeiconsIcon
                              icon={Cancel01Icon}
                              strokeWidth={2}
                              className="size-3"
                            />
                          </span>
                        </Button>
                      </Badge>
                    ) : null;
                  })
                ) : (
                  <span className="text-muted-foreground">
                    Select framework
                  </span>
                )}
              </div>
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                strokeWidth={2}
                className="text-muted-foreground/80 shrink-0"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={() => toggleSelection(framework.value)}
                    >
                      <span className="truncate">{framework.label}</span>
                      {selectedValues.includes(framework.value) && (
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          strokeWidth={2}
                          className="ml-auto size-4"
                        />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ComboboxMultipleDemo;
