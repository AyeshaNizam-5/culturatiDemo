"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  searchPlaceholder?: string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  emptyMessage = "No option found.",
  className,
  searchPlaceholder = "Search option..."
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border border-gray-200 shadow-md">
        <Command shouldFilter={false} className="bg-white">
          <CommandInput 
            placeholder={searchPlaceholder} 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="border-none focus:ring-0"
          />
          <CommandList className="max-h-[200px]">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options
                .filter((option) => 
                  option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  option.value.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                  className="flex items-center"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 