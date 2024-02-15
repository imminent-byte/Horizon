import { Users } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

export const MemberToggle = ({
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" >
                    <Users className="text-dmeffects/55"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 flex gap-0">
                
            </SheetContent>
        </Sheet>
    )
}