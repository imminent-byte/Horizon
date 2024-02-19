'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import { useModal } from '@/hooks/use-modal-store';
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "deleteServer";
    const { server } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true)

            await axios.delete(`/api/servers/${server?.id}`);

            onClose();
            router.push('/');
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="
                p-0 overflow-hidden
                bg-lmbg text-lmtext
                dark:bg-dmbg dark:text-dmtext
            ">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center dark:text-dmtext text-lmtext">
                        Are you sure you want to Delete <span className="font-semibold text-dmlinks">{server?.name}</span> ?
                        <br/>
                        This action <span className="text-rose-500 font-bold">CANNOT</span> be undone!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100/5 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} className="bg-rose-500 text-white hover:bg-rose-950 hover:text-dmlinks" onClick={onClick}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}