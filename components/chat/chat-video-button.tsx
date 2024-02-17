'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"


import { Video, VideoOff } from "lucide-react"

import { ActionTooltip } from "../action-tooltip"

export const ChatVideoButton = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchparams = useSearchParams();

    const isVideo = searchparams?.get("video");

    const onClick = () => {
        const url = queryString.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true,
            }
        }, { skipNull: true })

        
        router.push(url);
    }

    const Icon = isVideo ? VideoOff : Video;

    const tooltipLabel = isVideo ? "Leave Call" : "Start Video"

    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className="hover:opacity-75 transition mr-4">
                <Icon className="h-6 w-6 text-lmeffects dark:text-dmeffects"/>
            </button>
        </ActionTooltip>
    )
}