"use client";
import { Form } from "@/components/ui/form";
import {
  GenerateHobbiesSchema,
  GenerateHobbiesValues,
  HobbySchema,
  HobbyValues,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import {
  Control,
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { EditorFormProps } from "../constants/types";
import { MdDragIndicator } from "react-icons/md";
import CustomFormField from "../components/CustomFormField";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaChevronDown, FaWandMagicSparkles } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";
import { hobbyDefValues } from "@/validations/defaultValues";
import { generateHobbies } from "./action";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuLoaderCircle } from "react-icons/lu";
import AIButton from "@/components/custom/AIButton";

const HobbyForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<HobbyValues>({
    resolver: zodResolver(HobbySchema),
    defaultValues: {
      hobbies: resumeData.hobbies || [hobbyDefValues],
    },
  });

  const { append, remove, fields, move } = useFieldArray({
    name: "hobbies",
    control: form.control,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        hobbies: values.hobbies?.filter((item) => item !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [resumeData, setResumeData, form]);

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold">Hobbies</h1>
      <p className="mt-2">
        Add your hobbies (not recommended for professional resumes)
      </p>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
            <div className="flex justify-end">
              <AIHobbiesGenerator form={form} />
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <HobbyItem
                    id={field.id}
                    form={form}
                    key={field.id}
                    index={index}
                    remove={remove}
                    control={form.control}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <Button
            className="mt-4 w-full py-6 text-foreground"
            onClick={() => append(hobbyDefValues)}
          >
            Add More
            <IoMdAdd />
          </Button>
        </Form>
      </div>
    </div>
  );
};

interface HobbyItemProps {
  id: string;
  form: UseFormReturn<HobbyValues>;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<HobbyValues>;
}

const HobbyItem = ({ id, form, index, remove, control }: HobbyItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className={clsx(
        "rounded-lg duration-75",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <Accordion
        type="single"
        className="rounded-lg border border-border bg-background px-2 py-4 md:px-4"
        collapsible
        defaultValue={"item-1"}
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="truncate py-0 outline-none">
            <div className="flex w-full items-center justify-between gap-x-4">
              <div>
                <MdDragIndicator
                  {...listeners}
                  {...attributes}
                  className="rotate-90 cursor-grab !touch-none text-xl focus:outline-none"
                />
              </div>
              <div className="flex w-full items-center justify-between truncate">
                <p className="truncate text-lg font-semibold">
                  {form.watch("hobbies")?.[index]?.name || "untitled"}
                </p>
                <span>
                  <FaChevronDown />
                </span>
              </div>
              <div>
                <Button
                  className="px-3 text-destructive hover:text-destructive"
                  variant={"ghost"}
                  onClick={() => remove(index)}
                >
                  <FiTrash className="text-2xl" />
                </Button>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex-1 px-2 py-4 md:px-4">
              <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4">
                <div className="col-span-2">
                  <CustomFormField
                    props={{
                      name: `hobbies.${index}.name`,
                      fieldType: "text",
                      label: "Hobby name",
                      placeholder: "The name of your hobby",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2">
                  <CustomFormField
                    props={{
                      name: `hobbies.${index}.description`,
                      fieldType: "textarea",
                      label: "Description",
                      placeholder: "Describe your hobby",
                    }}
                    control={control}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HobbyForm;

const AIHobbiesGenerator = ({ form }: { form: UseFormReturn<HobbyValues> }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const descForm = useForm({
    mode: "onChange",
    resolver: zodResolver(GenerateHobbiesSchema),
  });

  async function handleClick(
    description: GenerateHobbiesValues["description"],
  ) {
    try {
      try {
        setLoading(true);
        const result = await generateHobbies({ description });
        if (result.error) {
          const tID = toast.error(
            <div className="flex items-center justify-between space-x-1 ps-1">
              <p className="text-sm">{result.error}</p>
              <Button
                className="text-xs"
                size={"sm"}
                variant={"secondary"}
                onClick={() => toast.dismiss(tID)}
              >
                Cancel
              </Button>
            </div>,
            { position: "bottom-center" },
          );
        } else if (result.success) {
          const arr = result.success.content;
          form.setValue("hobbies", arr);
        }
      } catch (error) {
        toast.error("Something went wrong", { position: "bottom-center" });
        console.log(error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "bottom-center" });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div>
          <AIButton text="Fill with AI" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="flex items-center space-x-2">
              <FaWandMagicSparkles />
              <span>Take help from AI</span>
            </p>
          </DialogTitle>
          <DialogDescription>
            Describe a little about your hobbies, what you like to do, your
            achievements in extra curricular etc.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...descForm}>
            <CustomFormField
              control={descForm.control}
              props={{
                fieldType: "textarea",
                name: "description",
                label: "Description",
                placeholder:
                  "eg: I love cooking food for my family, I have also been featured in a news blog for my cooking skills.",
              }}
            />
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              const isValid = await descForm.trigger();
              if (!isValid) return;
              const description = descForm.watch("description");
              handleClick(description);
            }}
            type="submit"
          >
            {loading && <LuLoaderCircle className="animate-spin" />}
            {!loading && <FaWandMagicSparkles />}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
