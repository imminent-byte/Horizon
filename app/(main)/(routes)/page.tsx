import { ModeToggle } from "@/components/toggle-mode";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div>
        <UserButton
          afterSignOutUrl="/sign-in"
        />
        <ModeToggle/>
      </div>
    </div>
  );
}
