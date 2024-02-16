"use client"

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "../ui/form"

import { Input } from '../ui/input';
import { Paperclip, Smile } from 'lucide-react';

import axios from 'axios';
import queryString from 'query-string';
import { useModal } from '@/hooks/use-modal-store';

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
})

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) => {
    const { onOpen } = useModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const url = queryString.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, value);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative p-4 pb-6'>
                                    <button
                                        type='button'
                                        onClick={() => onOpen("messageFile", { apiUrl, query })}
                                        className='absolute top-7 left-8 h-[24px] w-[24px] bg-lmeffects dark:bg-dmeffects hover:bg-lmlinks dark:hover:bg-dmlinks transition rounded-full p-1 flex items-center justify-center'
                                    >
                                        <Paperclip className='text-lmtext dark:text-dmtext dark:hover:text-dmbg'/>
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        placeholder={`Message ${type === "conversation" ? name : name}`}
                                        className='px-14 py-6 bg-lmsbg dark:bg-dmeffects/5 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lmtext dark:text-dmtext'
                                        {...field}
                                    />
                                    <div className='absolute top-7 right-8'>
                                        <Smile className='dark:text-dmeffects dark:hover:text-dmlinks'/>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}