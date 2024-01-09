import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'

function SelectCombobox({
  values,
  selected,
  setSelected
}: {
  values: { value: string; label: string }[]
  selected: string
  setSelected: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (values.length > 0 && !selected) {
      setSelected(values[0].value)
    }
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit md:w-[350px] justify-between">
          {selected ? values.find((t) => t.value === selected)?.label : 'Select value...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder="Search value..." />
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup>
            {values.map((ele) => (
              <CommandItem
                key={ele.value}
                value={ele.value}
                onSelect={(currentValue) => {
                  setSelected(currentValue === selected ? '' : currentValue)
                  setOpen(false)
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', selected === ele.value ? 'opacity-100' : 'opacity-0')} />
                {ele.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectCombobox
