import { Menu, Text } from "lucide-react";

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
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-dmeffects/55 border-b-2">
            <Menu className="text-dmeffects/55 mr-2"/>
            {type === "channel" && (
                <Text className="w-5 h-5 text-lmeffects dark:text-dmlinks mr-2"/>
            )}
            <p className="font-semibold text-md text-lmtext dark:text-dmlinks">
                {name}
            </p>
        </div>
    )
}