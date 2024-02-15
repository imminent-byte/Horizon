import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Users } from "lucide-react"

export const MemberToggle = ({
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Users className="text-dmeffects/55"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 flex gap-0">
                
            </SheetContent>
        </Sheet>
    )
}