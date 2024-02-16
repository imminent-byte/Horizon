import { Text } from "lucide-react";

interface ChatWelcomeProps {
    name: string;
    type: "channel" | "conversation";
}

const ChatWelcome = ({
    name,
    type
}: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
        <p className="text-xl md:text-3xl font-bold">
            {type === "channel" ? "Welcome to ": ""}{name}
        </p>
        <p className="text-effects dark:text-dmeffects text-sm">
            {type === "channel"
                ? `${name} starts here`
                : `This is the start of you conversation with ${name}`
            }
        </p>
    </div>
  )
}

export default ChatWelcome