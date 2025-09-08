"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const partCategories = [
  { value: "", label: "None" },
  { value: "Accessories", label: "Accessories" },
  { value: "Air Conditioning & Heating", label: "Air Conditioning & Heating" },
  { value: "Alternators & Starters", label: "Alternators & Starters" },
  { value: "Battery & Accessories", label: "Battery & Accessories" },
  { value: "Bearings & Seals", label: "Bearings & Seals" },
  { value: "Belts & Hoses", label: "Belts & Hoses" },
  { value: "Brakes", label: "Brakes" },
  { value: "Driveshaft & Axle", label: "Driveshaft & Axle" },
  { value: "Chassis & Steering", label: "Chassis & Steering" },
  { value: "Detailing", label: "Detailing" },
  { value: "Engine Cooling", label: "Engine Cooling" },
  { value: "Engine Sensors & Emissions", label: "Engine Sensors & Emissions" },
  { value: "Engines & Transmissions", label: "Engines & Transmissions" },
  { value: "Exhaust", label: "Exhaust" },
  { value: "Filters", label: "Filters" },
  { value: "Fuel Delivery", label: "Fuel Delivery" },
  { value: "Gaskets", label: "Gaskets" },
  { value: "Hardware & Fasteners", label: "ardware & Fasteners" },
  { value: "Heavy Duty, Ag & Fleet", label: "Heavy Duty, Ag & Fleet" },
  { value: "Ignition & Tune-Up", label: "Ignition & Tune-Up" },
  { value: "Lawn and Garden", label: "Lawn and Garden" },
  { value: "Lighting & Electrical", label: "Lighting & Electrical" },
  { value: "Marine & Boat", label: "Marine & Boat" },
  { value: "More Powersport", label: "More Powersport" },
  { value: "Oil, Chemicals & Fluid", label: "Oil, Chemicals & Fluid" },
  { value: "Paint & Body", label: "Paint & Body" },
  { value: "Performance", label: "Performance" },
  { value: "Recreational Vehicle", label: "Recreational Vehicle" },
  { value: "Shocks & Struts", label: "Shocks & Struts" },
  { value: "Tire & Wheel", label: "Tire & Wheelb" },
  { value: "Tools & Equipment", label: "Tools & Equipment" },
  { value: "Trailer & Towing", label: "Trailer & Towing" },
  {
    value: "Turbocharger & Supercharger",
    label: "Turbocharger & Supercharger",
  },
  { value: "Whipers & Components", label: "Whipers & Components" },
];

export function Combobox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value ? value : "Select category..."}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search category...' className='h-9' />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {partCategories.map((cat) => (
                <CommandItem
                  key={cat.value}
                  value={cat.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {cat.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
