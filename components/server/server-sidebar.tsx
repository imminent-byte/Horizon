import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { ChannelType } from "@prisma/client";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
    serverId: string;
}

const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile){
        return redirect('/');
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    if(!server) {
        return redirect('/');
    }

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)

    const members = server?.members;

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

  return (
    <div className="flex flex-col h-full w-full 
        text-lmtext bg-lmsbg2 
        dark:text-dmtext dark:bg-dmsbg2
    ">
        <ServerHeader
            server={server}
            role={role}
        />
    </div>
  )
}

export default ServerSidebar