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
} from "@/components/ui/form"

import { Button } from "@/components/ui/button";

import queryString from 'query-string';

import { FileUpload } from "../file-upload";
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';


const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "File is required."
    })
})

export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const { apiUrl, query } = data;

    const router = useRouter();

    const isModalOpen = isOpen && type == "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: '',
        }
    })

    const handleClose = () =>{
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            const url = queryString.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.post(url, {
                ...values,
                content: values.fileUrl
            });

            form.reset();

            router.refresh();

            handleClose();
        } catch (error) {
            console.log(error);
        }
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
                        Upload Your File
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="px-6 py-4
                            bg-lmsbg text-lmtext
                            dark:bg-dmsbg dark:text-dmtext
                        ">
                            <Button variant="primary" className="w-full" disabled={isLoading}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}