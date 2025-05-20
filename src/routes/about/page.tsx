import { SkillsSection } from "@/entitites/skillsPanel";
import { ToHome } from "@/shared/ui/toHome";

export default function AboutPage() {
  return (
    <div className="flex h-[100vh]">
      <ToHome />
      <SkillsSection />
    </div>
  );
}