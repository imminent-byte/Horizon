'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { useModal } from '@/hooks/use-modal-store';
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const MembersModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "members";
    const { server } = data;

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="
                p-0 overflow-hidden
                bg-lmbg text-lmtext
                dark:bg-dmbg dark:text-dmtext
            ">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite People
                    </DialogTitle>
                </DialogHeader>
               <div className="p-6">
                    HELLO MEMBERS
               </div>
            </DialogContent>
        </Dialog>
    )
}