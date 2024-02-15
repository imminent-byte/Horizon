import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import db from "@/lib/db";

import { ChannelType, MemberRole } from "@prisma/client";


import { ScrollArea } from "../ui/scroll-area";

import { Mic, Shield, ShieldCheck, Text, User, Video } from "lucide-react";
import { Separator } from "../ui/separator";

import ServerHeader from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";

interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Text className="mr-2 w-4 h-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 w-4 h-4"/>
}

const roleIconMap = {
    [MemberRole.GUEST]: <User/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-dmeffects"/>,
    [MemberRole.ADMIN]: <Shield className="h-4 w-4 mr-2 text-dmlinks"/>
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
        <ScrollArea className="flex-1 px-3">
            <div className="mt-2">
                <ServerSearch
                    data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                    // TODO: change this later to display on sheet, have to get this on the sheet component and follow from 6:35:10
                        {
                            label: "Members",
                            type: "channel",
                            data: members?.map((member) => ({
                                id: member.id,
                                name: member.profile.name,
                                icon: roleIconMap[member.role],
                            }))
                        },
                    ]}
                />
            </div>
            <Separator className="bg-lmeffects/10 dark:bg-dmeffects/10 rounded-md my-2"/>
            {!!textChannels?.length && (
                <div className="mb-2">
                    <ServerSection
                        sectionType="channels"
                        channelType={ChannelType.TEXT}
                        role={role}
                        label="Text Channels"
                    />
                    {textChannels.map((channel) => (
                        <ServerChannel
                            key={channel.id}
                            channel={channel}
                            server={server}
                        />
                    ))}
                </div>
            )}
            {!!audioChannels?.length && (
                <div className="mb-2">
                    <Separator className="bg-lmeffects/10 dark:bg-dmeffects/10 rounded-md my-2"/>
                    <ServerSection
                        sectionType="channels"
                        channelType={ChannelType.AUDIO}
                        role={role}
                        label="Voice Channels"
                    />
                    {audioChannels.map((channel) => (
                        <ServerChannel
                            key={channel.id}
                            channel={channel}
                            server={server}
                        />
                    ))}
                </div>
            )}
            {!!videoChannels?.length && (
                <div className="mb-2">
                    <Separator className="bg-lmeffects/10 dark:bg-dmeffects/10 rounded-md my-2"/>
                    <ServerSection
                        sectionType="channels"
                        channelType={ChannelType.VIDEO}
                        role={role}
                        label="Video Channels"
                    />
                    {videoChannels.map((channel) => (
                        <ServerChannel
                            key={channel.id}
                            channel={channel}
                            server={server}
                        />
                    ))}
                </div>
            )}
        </ScrollArea>
    </div>
  )
}

export default ServerSidebar