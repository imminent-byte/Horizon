'use client'

import { cn } from "@/lib/utils";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"

import { Edit, Lock, Mic, Text, Trash, Video } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Text,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video
}

export const ServerChannel = ({
    channel,
    server,
    role
}: ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];

    return (
        <button onClick={() => {}} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-lmsbg dark:hover:bg-dmsbg transition mb-1", params?.channelId == channel.id && "bg-lmsbg dark:bg-dmsbg")}>
            <Icon className="flex-shrink-0 w-5 h-5 text-lmeffects dark:text-dmeffects"/>
            <p className={cn("line-clamp-1 font-semibold text-sm text-lmtext group-hover:text-lmlinks dark:text-dmtext dark:group-hover:text-dmlinks transition", params?.channelId === channel.id && "text-primary dark:text-dmeffects dark:group-hover:text-dmlinks")}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit
                            className="hidden group-hover:block w-4 h-4 text-lmtext hover:text-lmeffects dark:text-dmtext dark:hover:text-dmlinks transition"
                        />
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash
                            className="hidden group-hover:block w-4 h-4 text-lmtext hover:text-lmeffects dark:text-dmtext dark:hover:text-dmlinks transition"
                        />
                    </ActionTooltip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"/>
            )}
        </button>
    )
}