import AnimateUpOnAppear from "@/components/custom/animators/AnimateUpOnAppear";
import { Badge } from "@/components/ui/badge";
import testimonials, { TestimonialValues } from "./constants";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { Marquee } from "@/components/magicui/marquee";

const mid = Math.ceil(testimonials.length / 2);
const firstRow = testimonials.slice(0, mid);
const secondRow = testimonials.slice(mid);

const Testimonial = () => {
  return (
    <section id="testimonials">
      <AnimateUpOnAppear>
        <div className="mx-auto max-w-[1400px] pt-16">
          <div className="rounded-t-3xl border border-b-0 border-border bg-background px-2 py-12 md:rounded-t-[75px] md:py-16">
            <div className="flex items-center justify-center">
              <Badge
                className="rounded-full border-primary bg-transparent px-3 py-1 text-foreground"
                variant={"outline"}
              >
                <span className="me-2 scale-125 text-primary">•</span>
                <span>Testimonial</span>
              </Badge>
            </div>
            <h2 className="mt-8 text-center text-4xl font-bold text-foreground md:text-5xl md:font-normal">
              What Our Users Say
            </h2>

            <div className="relative mt-16">
              <Marquee reverse pauseOnHover className="[--duration:30s]">
                {firstRow.map((review, idx) => (
                  <Card key={"review-" + idx} item={review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:30s]">
                {secondRow.map((review, idx) => (
                  <Card key={"review-" + idx} item={review} />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)]" />
            </div>
          </div>
        </div>
        {/* <div className="mx-auto max-w-[1400px] bg-gradient-to-b from-primary to-background py-24"></div> */}
      </AnimateUpOnAppear>
    </section>
  );
};
export default Testimonial;

const Card = ({ item }: { item: TestimonialValues }) => {
  return (
    <div className="w-[450px] rounded-lg border border-border bg-background-muted p-4">
      <div className="flex items-center space-x-2">
        <div className="relative aspect-square w-8 overflow-hidden rounded-full border border-white/50">
          <Image
            src={item.img}
            fill
            className="h-full w-full object-cover object-center"
            alt="user"
          />
        </div>
        <p className="font-bold text-foreground">{item.name}</p>
      </div>
      <div className="mt-4 flex flex-nowrap items-center">
        {Array.from({ length: Math.floor(item.rating) }).map((star, index) => (
          <span key={"-star-" + index} className="text-yellow-400">
            <FaStar />
          </span>
        ))}
        {item.rating % 1 !== 0 && (
          <span className="text-yellow-400">
            <FaStarHalf />
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-foreground">
        &quot; {item.message} &quot;
      </p>
    </div>
  );
};
