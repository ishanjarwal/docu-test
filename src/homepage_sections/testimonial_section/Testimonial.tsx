import { Badge } from "@/components/ui/badge";
import Swipers from "./Swipers";

const Testimonial = () => {
  return (
    <section>
      <div className="mx-auto max-w-[1400px] pt-16">
        <div className="rounded-t-3xl bg-primary px-2 py-12 md:rounded-t-[75px] md:py-16">
          <div className="flex items-center justify-center">
            <Badge
              className="rounded-full border-white bg-transparent px-3 py-1 text-white"
              variant={"outline"}
            >
              <span className="me-2 scale-125">•</span>
              <span>Testimonial</span>
            </Badge>
          </div>
          <h2 className="mt-8 text-center text-4xl font-bold text-white md:text-5xl md:font-normal">
            What Our Users Say
          </h2>

          <Swipers />
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] bg-gradient-to-b from-primary to-background py-24"></div>
    </section>
  );
};

export default Testimonial;
