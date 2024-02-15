'use client'

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ActionTooltip } from "../action-tooltip"

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
};

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <ActionTooltip side="bottom" align="center" label={name}>
            <button onClick={onClick} className="group relative flex items-center">
                <div className={cn(
                 "absolute left-0 mr-2 bg-primary rounded-full transition-all duration-200",
                    params?.serverId !== id && "group-hover:h-[8px] group-hover:w-[8px] group-hover:scale-100",
                    params?.serverId === id ? "w-[10px] h-[10px] bg-dmlinks dark:bg-dmlinks" : 'scale-0'
                )}/>
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "rounded-[16px]"
                )}>
                    <Image
                        alt="server"
                        fill
                        src={imageUrl}
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}