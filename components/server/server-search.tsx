'use client'

import { ChevronUp, Search } from "lucide-react";

import { useEffect, useState } from "react";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useParams, useRouter } from "next/navigation";
import { Member, Profile } from "@prisma/client";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
    profile: Profile
}

export const ServerSearch = ({
    data,
    profile
}: ServerSearchProps) => {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [])

    const onClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
        setOpen(false);

        if(type === "member") {
            return router.push(`servers/${params?.serverId}/converstaions/${id}`)
        }

        if(type === "channel") {
            return router.push(`servers/${params?.serverId}/channels/${id}`)
        }
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-lmbg dark:hover:bg-dmbg transition">
                <Search className="w-4 h-4 relative -top-[0.1rem] text-lmlinks dark:text-dmlinks"/>
                <p className="font-semibold text-sm text-lmlinks dark:text-dmtext group-hover:text-lmlinks dark:group-hover:text-dmlinks transition duration-700">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-dmlinks/55 dark:bg-dmbg/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span><ChevronUp className="h-3 w-3"/></span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search Channels and Members"/>
                <CommandList>
                    <CommandEmpty>
                        No Results Found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    {if(profile.name === name) {
                                        return (
                                        <CommandItem key={id}>
                                                {icon}
                                                <span>{name}</span><span className="text-xs text-dmeffects ml-2">YOU</span>
                                        </CommandItem>
                                        )
                                    } else 
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )}
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}