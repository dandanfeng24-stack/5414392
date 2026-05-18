import { AiEntrySection } from "@/components/home/AiEntrySection";
import { CasePreviewSection } from "@/components/home/CasePreviewSection";
import { DatabaseEntrySection } from "@/components/home/DatabaseEntrySection";
import { Hero } from "@/components/home/Hero";
import { PackageProSection } from "@/components/home/PackageProSection";
import { RankingPreviewSection } from "@/components/home/RankingPreviewSection";
import { ThemeEntrySection } from "@/components/home/ThemeEntrySection";
import { cases, packages, projects, rankings, themes } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThemeEntrySection themes={themes} />
      <RankingPreviewSection rankings={rankings} projects={projects} />
      <DatabaseEntrySection projects={projects} />
      <CasePreviewSection cases={cases} />
      <AiEntrySection />
      <PackageProSection packages={packages} />
    </>
  );
}
