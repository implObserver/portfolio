import { SocialLinks } from "@/entitites/contacts";
import { ToHome } from "@/shared/ui/toHome";

export default function ContactsPage() {
    return (
        <div className="flex h-[100vh]">
            <ToHome />
            <SocialLinks />
        </div>
    );
}