import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Users } from "lucide-react"
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";

import db from "@/lib/db"
import { ServerSection } from "./server/server-section";
import { ServerMember } from "./server/server-member";



export const MemberToggle = async ({
    serverId
}: {
    serverId: string
}) => {
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

    const members = server?.members;

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Users className="text-dmeffects/55"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
            {!!members?.length && (
            <div className="mb-2">
                <ServerSection
                    sectionType="members"
                    role={role}
                    label="Members"
                    server={server}
                />
                {members.map((member) => (
                    <ServerMember
                        member={member}
                        server={server}
                        profile={profile}
                    />
                ))}
            </div>
        )}
            </SheetContent>
        </Sheet>
    )
}