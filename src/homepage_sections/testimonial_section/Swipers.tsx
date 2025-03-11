"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import testimonials from "./constants";
import "./testimonial.css";

const Swipers = () => {
  const sw1 = useRef<SwiperRef>(null);
  const sw2 = useRef<SwiperRef>(null);

  const swiper_options: SwiperOptions = {
    modules: [Autoplay],
    slidesPerView: 1,
    loop: true,
    spaceBetween: 12,
    speed: 3000,
    freeMode: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  };

  useEffect(() => {
    if (sw1.current && sw2.current) {
      sw1.current.swiper.autoplay.start();
      sw2.current.swiper.autoplay.start();
    }
  }, []);

  return (
    <div className="mt-16 flex flex-col">
      <div className="testimonial_swiper relative">
        <div className="swiper_overlay absolute left-0 top-0 z-10 h-full w-full" />
        <Swiper ref={sw1} {...swiper_options} className="!py-2">
          {testimonials.slice(0, 12).map((item, index) => (
            <SwiperSlide key={"slide-" + index} className="!overflow-visible">
              <div className="rounded-lg border border-white/50 bg-white/10 p-4 duration-150 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="relative aspect-square w-8 overflow-hidden rounded-full border border-white/50">
                    <Image
                      src={item.img}
                      fill
                      className="h-full w-full object-cover object-center"
                      alt="user"
                    />
                  </div>
                  <p className="font-bold text-white">{item.name}</p>
                </div>
                <div className="mt-4 flex flex-nowrap items-center">
                  {Array.from({ length: Math.floor(item.rating) }).map(
                    (star, index) => (
                      <span key={"-star-" + index} className="text-yellow-400">
                        <FaStar />
                      </span>
                    ),
                  )}
                  {item.rating % 1 !== 0 && (
                    <span className="text-yellow-400">
                      <FaStarHalf />
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-white">
                  &quot; {item.message} &quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* reverse */}
      <div className="testimonial_swiper relative">
        <div className="swiper_overlay absolute left-0 top-0 z-10 h-full w-full" />
        <Swiper
          ref={sw2}
          {...swiper_options}
          autoplay={{
            delay: 0,
            reverseDirection: true,
          }}
          className="!py-2"
        >
          {testimonials.slice(12, 24).map((item, index) => (
            <SwiperSlide
              key={"slide-" + index}
              className="!h-full !overflow-visible"
            >
              <div className="rounded-lg border border-white/50 bg-white/10 p-4 duration-150 hover:scale-105">
                <div className="flex items-center space-x-2">
                  <div className="relative aspect-square w-8 overflow-hidden rounded-full border border-white/50">
                    <Image
                      src={item.img}
                      fill
                      className="h-full w-full object-cover object-center"
                      alt="user"
                    />
                  </div>
                  <p className="font-bold text-white">{item.name}</p>
                </div>
                <div className="mt-4 flex flex-nowrap items-center">
                  {Array.from({ length: Math.floor(item.rating) }).map(
                    (star, index) => (
                      <span key={"-star-" + index} className="text-yellow-400">
                        <FaStar />
                      </span>
                    ),
                  )}
                  {item.rating % 1 !== 0 && (
                    <span className="text-yellow-400">
                      <FaStarHalf />
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-white">
                  &quot; {item.message} &quot;
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Swipers;
