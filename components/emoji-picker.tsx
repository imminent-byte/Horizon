'use client'

import { Smile } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

interface EmojiPickerProps {
    onChange: (value: string) => void
}

const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();

  return (
    <Popover>
        <PopoverTrigger>
            <Smile
                className="text-lmtext dark:text-dmtext hover:text-lmeffects dark:hover:text-dmeffects transition"
            />
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={40} className="bg-transparent border-none shadow-none drop-shadow-none mb-16">
            <Picker
                theme={resolvedTheme}
                data={data}
                onEmojiSelect={(emoji: any) => onChange(emoji.native)}
            />
        </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker