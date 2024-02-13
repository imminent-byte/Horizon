'use client';

import axios from 'axios';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { Dialog } from "@/components/ui/initial-modal-dialog";

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

import { useEffect, useState } from "react";

import { Exo } from "next/font/google";
import { cn } from "@/lib/utils";

import { FileUpload } from "../file-upload";
import { useRouter } from 'next/navigation';

const font = Exo({weight: ['100'] , subsets: ["latin"] });

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Domain name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Domain image is required."
    })
})

export const InitialModal = () => {
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            await axios.post('/api/servers', values);

            form.reset();

            router.refresh();
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    if(!isMounted) {
        return null;
    }

    return(
        <Dialog open>
            <DialogContent className="
                p-0 overflow-hidden
                bg-lmbg text-lmtext
                dark:bg-dmbg dark:text-dmtext
            ">
                <DialogHeader className="pt-8 px-6">
                    <div className={cn("p-7 text-center text-[2.25rem] leading-[3rem]", font.className)}>
                        Welcome to HORIZON
                    </div>
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create Your Domain
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Your Domain is what you create it, give it a Name and Image to Get Started
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
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}