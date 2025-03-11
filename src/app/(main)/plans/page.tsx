import Navbar from "@/features/navbar/components/Navbar";
import Plans from "@/features/premium/components/Plans";
import HeroBackground from "@/homepage_sections/hero/HeroBackground";

export default function Example() {
  return (
    <main className="relative">
      <HeroBackground />
      <Navbar />
      <Plans />
    </main>
  );
}
