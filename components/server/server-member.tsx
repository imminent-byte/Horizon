"use client"

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { Shield, ShieldCheck, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: <User/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-dmeffects"/>,
    [MemberRole.ADMIN]: <Shield className="h-4 w-4 mr-2 text-dmlinks"/>
}

export const ServerMember = ({
    member,
    server
}: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role]

    return (
        <button onClick={() => {}} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-lmsbg dark:hover:bg-dmsbg transition mb-1", params?.memberId == member.id && "bg-lmsbg dark:bg-dmsbg")}>
            <UserAvatar src={member.profile.imageUrl} className="h-6 w-6 md:h-8 md:w-8"/>
            {icon}
            <p className={cn("line-clamp-1 font-semibold text-sm text-lmtext group-hover:text-lmlinks dark:text-dmtext dark:group-hover:text-dmlinks transition", params?.memberId === member.id && "text-primary dark:text-dmeffects dark:group-hover:text-dmlinks")}>
                {member.profile.name}
            </p>
        </button>
    )
}