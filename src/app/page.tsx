import Navbar from "@/features/navbar/components/Navbar";
import Contact from "@/homepage_sections/contact/Contact";
import Features from "@/homepage_sections/features_section/Features";
import Footer from "@/homepage_sections/footer/Footer";
import Hero from "@/homepage_sections/hero/Hero";
import Steps from "@/homepage_sections/steps_section/Steps";
import Testimonial from "@/homepage_sections/testimonial_section/Testimonial";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      {/* <ResumeExamples /> */}
      <Steps />
      <Testimonial />
      <Contact />
      <Footer />
    </main>
  );
}
