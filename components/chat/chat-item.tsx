'use client'

import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { Edit, FileIcon, Shield, ShieldHalf, Trash, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { useRouter, useParams } from "next/navigation";

import * as z from"zod";
import axios from "axios";
import queryString from "query-string";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    "GUEST": <User/>,
    "MODERATOR": <ShieldHalf className="h-4 w-4 ml-2 text-dmeffects"/>,
    "ADMIN": <Shield className="h-4 w-4 ml-2 text-dmlinks"/>
}

const formSchema = z.object({
    content: z.string().min(1),
})

export const ChatItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery
}: ChatItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();

    const params = useParams();
    const router = useRouter();

    const onMemberClick = () => {
        if(member.id == currentMember.id) {
            return;
        }

        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if(event.key === "Escape" || event.keyCode == 27) {
                setIsEditing(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown)

        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = queryString.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            })

            await axios.patch(url, values)
            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        form.reset({
            content: content,
        })
    }, [content])

    const fileType = fileUrl?.split(".").pop();

    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted  && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    return (
        <div className="relative group flex items-center hover:bg-dmlinks/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div onClick={onMemberClick} className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={member.profile.imageUrl}/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p onClick={onMemberClick} className="font-semibold text-sm hover:underline cursor-pointer">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-lmeffects dark:text-dmeffects">
                            {timestamp}
                        </span>
                    </div>
                        {isImage && (
                            <a 
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                            >
                                <Image
                                    src={fileUrl}
                                    alt={content}
                                    fill
                                    className="object-cover"
                                />
                            </a>
                        )}
                        {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-dmeffects stroke-dmlinks"/>
                            <a 
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-lmlinks dark:text-dmlinks hover:underline"
                            >
                                PDF File
                            </a>
                        </div>
                        )}
                        {!fileUrl && !isEditing && (
                            <p className={cn(
                                "text-sm text-zinc-600 dark:text-zinc-300",
                                deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs m-1"
                            )}>
                                {content}
                                {isUpdated && !deleted && (
                                    <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">(edited)</span>
                                )}
                            </p>
                        )}
                        {!fileUrl && isEditing && (
                            <Form {...form}>
                                <form className="flex items-center w-full gap-x-2 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <div className="relative w-full">
                                                        <Input
                                                            autoFocus
                                                            disabled={isLoading}
                                                            className="p-2 bg-lmeffects/90 dark:bg-dmeffects/5 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lmtext dark:text-dmtext"
                                                            placeholder="Edit Message"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button disabled={isLoading} size="sm" variant="ghost" className="hover:bg-lmlinks dark:hover:bg-dmlinks hover:text-lmtext dark:hover:text-dmtext">
                                        Edit
                                    </Button>
                                </form>
                                <span className="text-[10px] mt-1 text-zinc-400">Press Esc to cancel, enter to save</span>
                            </Form>
                        )}
                    </div>
                </div>
                {canDeleteMessage && (
                    <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-dmbg/5 border rounded-sm">
                        {canEditMessage && (
                            <ActionTooltip label="Edit">
                                <Edit onClick={() => setIsEditing(true)} className="cursor-pointer ml-auto w-4 h-4 text-lmlinks hover:text-dmbg/5 dark:hover:text-zinc-300 transition"/>
                            </ActionTooltip>
                        )}
                        <ActionTooltip label="Delete">
                                <Trash onClick={() => onOpen("deleteMessage", {
                                    apiUrl: `${socketUrl}/${id}`,
                                    query: socketQuery
                                })} className="cursor-pointer ml-auto w-4 h-4 text-lmlinks hover:text-dmbg/5 dark:hover:text-zinc-300 transition"/>
                        </ActionTooltip>
                    </div>
                )}
            </div>
    )
}