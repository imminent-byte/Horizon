'use client';

import qs from "query-string";
import axios from 'axios';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { useParams, useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal-store';

import { ChannelType } from '@prisma/client';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be 'general"
        }
    ),
    type: z.nativeEnum(ChannelType)
})

export const CreateChannelModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === "createChannel";

    const router = useRouter();

    const params = useParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            type: ChannelType.TEXT,
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params?.serverId
                }
            })
            await axios.post(url, values);

            form.reset();

            router.refresh();

            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="
                p-0 overflow-hidden
                bg-lmbg text-lmtext
                dark:bg-dmbg dark:text-dmtext
            ">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create New Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        A place where people can communicate. <br/> Choose between text, audio or video.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-lmtext dark:text-dmtext">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0
                                                    bg-lmsbg text-lmtext
                                                    dark:bg-dmsbg dark:text-dmtext
                                                "
                                                placeholder="Enter Channel Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Channel Type</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none'>
                                                    <SelectValue
                                                        placeholder="Select Channel Type"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                        className='capitalize'
                                                    >
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4
                            bg-lmsbg text-lmtext
                            dark:bg-dmsbg dark:text-dmtext
                        ">
                            <Button variant="primary" className="w-full" disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}