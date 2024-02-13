'use client';

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Exo } from "next/font/google";

import { cn } from "@/lib/utils";

import { FileUpload } from "../file-upload";

import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal-store';
import { useEffect } from 'react';

const font = Exo({weight: ['100'] , subsets: ["latin"] });

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Domain name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Domain image is required."
    })
})

export const EditServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "editServer";
    const { server } = data;

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        }
    });

    useEffect(() => {
        if(server) {
            form.setValue("name", server.name);
            form.setValue('imageUrl', server.imageUrl);
        }
    }, [server, form])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values);

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
                        Create Your Domain
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Your Domain is what you create it
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

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
                                                placeholder="Enter Domain Name"
                                                {...field}
                                            />
                                        </FormControl>
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
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}