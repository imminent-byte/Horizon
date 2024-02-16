"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  return (
    <div className={cn("h-2 w-5 origin-center bg-dmeffects rounded-full transition-all duration-500", isConnected ? "h-4 w-4 bg-dmlinks" : "")}/>
  )
}