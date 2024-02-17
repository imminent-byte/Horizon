import { Text } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { MemberToggle } from "../member-toggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-dmeffects/55 border-b-2">
            <div className="flex items-center justify-center">
                <MobileToggle serverId={serverId}/>
                {type === "channel" && (
                    <Text className="w-5 h-5 text-lmeffects dark:text-dmlinks mr-2"/>
                )}
                {type === "conversation" && (
                    <UserAvatar
                        src={imageUrl}
                        className="h-6 w-6 md:h-8 md:w-8 mr-2"
                    />
                )}
                <p className="font-semibold text-md text-lmtext dark:text-dmlinks">
                    {name}
                </p>
            </div>
            <div className="flex items-center justify-center">
                <div className="ml-auto flex items-center">
                    {type === "conversation" && (
                        <ChatVideoButton/>
                    )}
                    <SocketIndicator/>
                </div>
                <MemberToggle serverId={serverId}/>
            </div>
        </div>
    )
}