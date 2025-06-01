"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { LegalTask } from "@/types"

const tasks = [
  { value: "hearing_request", label: "Hearing Request" },
  { value: "constitutional_argument", label: "Constitutional Argument" },
  { value: "equal_protection", label: "Equal Protection" },
  { value: "due_process", label: "Due Process" },
  { value: "statutory_analysis", label: "Statutory Analysis" },
  { value: "appendix_building", label: "Appendix Building" },
  { value: "rehabilitation_narrative", label: "Rehabilitation Narrative" },
  { value: "expert_testimony", label: "Expert Testimony" },
  { value: "comparative_law", label: "Comparative Law" },
  { value: "evidentiary_review", label: "Evidentiary Review" },
]

interface TaskSelectorProps {
  value: LegalTask
  onChange: (value: LegalTask) => void
}

export function TaskSelector({ value, onChange }: TaskSelectorProps) {
  const [open, setOpen] = useState(false)

  const selectedTask = tasks.find((task) => task.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedTask?.label || "Select task..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search tasks..." />
          <CommandList>
            <CommandEmpty>No task found.</CommandEmpty>
            <CommandGroup>
              {tasks.map((task) => (
                <CommandItem
                  key={task.value}
                  value={task.value}
                  onSelect={() => {
                    onChange(task.value as LegalTask)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === task.value ? "opacity-100" : "opacity-0")} />
                  {task.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
