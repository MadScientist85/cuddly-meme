"use client"

import type { Provider } from "@/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ProviderSelectorProps {
  value: Provider
  onChange: (value: Provider) => void
}

export function ProviderSelector({ value, onChange }: ProviderSelectorProps) {
  return (
    <RadioGroup value={value} onValueChange={(val) => onChange(val as Provider)} className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="openai" id="openai" />
        <Label htmlFor="openai" className="cursor-pointer">
          OpenAI
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="huggingface" id="huggingface" />
        <Label htmlFor="huggingface" className="cursor-pointer">
          Hugging Face
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="perplexity" id="perplexity" />
        <Label htmlFor="perplexity" className="cursor-pointer">
          Perplexity
        </Label>
      </div>
    </RadioGroup>
  )
}
