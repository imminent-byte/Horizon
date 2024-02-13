'use client'

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client"


import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
 } from "../ui/dropdown-menu";

import { ChevronDown, LucideLogOut, PlusCircle, Settings, Trash, UserPlus2, Users2 } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button className="w-full textmd font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                {server.name}
                <ChevronDown className="h-5 w-5 ml-auto"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-dmtext space-y-[2px]">
            <DropdownMenuItem onClick={() => onOpen("invite", { server })} className="text-lmlinks dark:text-dmlinks px-3 py-2 text-sm cursor-pointer">
                Invite People
                <UserPlus2 className="h-4 w-4 ml-auto"/>
            </DropdownMenuItem>
            {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                    Server Settings
                    <Settings className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                    Manage Members 
                    <Users2 className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuSeparator/>
            )}
            {isAdmin && (
                <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                    Delete Server
                    <Trash className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
            {!isAdmin && (
                <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                    Leave Server
                    <LucideLogOut className="h-4 w-4 ml-auto"/>
                </DropdownMenuItem>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader