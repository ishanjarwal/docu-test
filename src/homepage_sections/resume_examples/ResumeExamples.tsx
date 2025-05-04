"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { categories, examples } from "./constants";

const ResumeExamples = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [src, setSrc] = useState<string | undefined>(undefined);
  const list =
    activeCategory === "all"
      ? examples
      : examples.filter((item) => item.category === activeCategory) || examples;
  return (
    <section id="examples">
      <Modal
        setSrc={(val: string | undefined) => {
          setSrc(val);
        }}
        open={src ? true : false}
        src="/ats-template-1.png"
      />
      <div className="mx-auto max-w-7xl py-16">
        <div className="flex items-center justify-center">
          <Badge
            className="rounded-full border-primary bg-transparent px-3 py-1"
            variant={"outline"}
          >
            <span className="me-2 scale-125 text-primary">•</span>
            <span>Examples</span>
          </Badge>
        </div>
        <h2 className="mb-4 mt-4 text-center text-4xl font-bold sm:mb-8 md:text-6xl md:font-normal">
          Resume Examples
        </h2>
        <div className="px-4">
          <Tabs
            onValueChange={(value) => {
              setActiveCategory(value);
            }}
            defaultValue={activeCategory}
          >
            <div className="flex items-center justify-center">
              <TabsList className="mx-auto flex h-auto w-auto flex-wrap bg-transparent">
                <TabsTrigger
                  className="data-[state=active]:bg-background-muted sm:px-4 sm:py-3"
                  value="all"
                >
                  All
                </TabsTrigger>
                {categories.map((category, idx) => (
                  <TabsTrigger
                    key={"category-tab-" + idx}
                    className="capitalize data-[state=active]:bg-background-muted sm:px-4 sm:py-3"
                    value={category}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="mt-4">
              <TabsContent value={activeCategory}>
                <Card>
                  <CardHeader className="capitalize">
                    {activeCategory}
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
                    {list.map((listItem, idx) => (
                      <Card
                        key={"example-" + idx}
                        onClick={() => {
                          setSrc(listItem.image);
                        }}
                        className="aspect-[210/297] cursor-pointer overflow-hidden"
                      >
                        <CardContent className="group relative h-full w-full overflow-hidden p-0">
                          <Image
                            src={"/ats-template-1.png"}
                            fill
                            className="h-full w-full object-cover object-center duration-150 group-hover:rotate-3 group-hover:scale-125 group-hover:brightness-50"
                            alt={listItem.title}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ResumeExamples;

interface ModalProps {
  open: boolean;
  src: string;
  setSrc: (open: string | undefined) => void;
}

const Modal = ({ open, src, setSrc }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setSrc(undefined);
        }
      }}
    >
      <DialogContent className="max-h-screen overflow-auto sm:max-w-[500px]">
        <DialogTitle className="hidden">Title</DialogTitle>
        <ScrollArea>
          <Image
            alt=""
            src={src}
            width={720}
            height={1080}
            className="aspect-[210/297]"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
