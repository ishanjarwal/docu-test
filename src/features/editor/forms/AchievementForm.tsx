"use client";
import { Form } from "@/components/ui/form";
import {
  CommonAchievementSchema,
  CommonAchievementValues,
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
import { FaChevronDown, FaRegCalendar } from "react-icons/fa6";
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { commonAchievementDefValues } from "@/validations/defaultValues";

interface AchievementValues {
  achievements?: CommonAchievementValues;
}
const AchievementSchema = z.object({
  achievements: CommonAchievementSchema,
});

const AchievementForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<AchievementValues>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      achievements: resumeData.achievements || [],
    },
  });

  const { append, remove, fields, move } = useFieldArray({
    name: "achievements",
    control: form.control,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        achievements:
          values.achievements?.filter((item) => item !== undefined) || [],
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
      <h1 className="text-xl font-bold">Achievements</h1>
      <p className="mt-2">Add your certificates</p>
      <div className="mt-8">
        <Form {...form}>
          <div className="flex flex-col gap-y-8">
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
                  <AchievementItem
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
            onClick={() => append(commonAchievementDefValues)}
          >
            Add More
            <IoMdAdd />
          </Button>
        </Form>
      </div>
    </div>
  );
};

interface AchievementItemProps {
  id: string;
  form: UseFormReturn<AchievementValues>;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<AchievementValues>;
}

const AchievementItem = ({
  id,
  form,
  index,
  remove,
  control,
}: AchievementItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [yearOnly, setYearOnly] = useState<boolean>(false);

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
                  {form.watch("achievements")?.[index]?.title || "untitled"}
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
                      name: `achievements.${index}.title`,
                      fieldType: "text",
                      label: "Achievement title",
                      placeholder: "The title of your achievement",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <CustomFormField
                    props={{
                      name: `achievements.${index}.organization`,
                      fieldType: "text",
                      label: "Organization",
                      placeholder: "Organization",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <CustomFormField
                    props={{
                      name: `achievements.${index}.link`,
                      fieldType: "text",
                      label: "Link to your achievement",
                      placeholder: "Link to your achievement",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2">
                  <CustomFormField
                    props={{
                      name: `achievements.${index}.description`,
                      fieldType: "textarea",
                      label: "Description",
                      placeholder: "Describe your experience/learnings",
                    }}
                    control={control}
                  />
                </div>
              </div>
              <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <CustomFormField
                    props={{
                      name: `achievements.${index}.score`,
                      fieldType: "text",
                      label: "Score",
                      placeholder: "Your score",
                    }}
                    control={control}
                  />
                </div>
                {yearOnly ? (
                  <>
                    <div>
                      <CustomFormField
                        props={{
                          placeholder: "Select date",
                          name: `achievements.${index}.startDate`,
                          fieldType: "year",
                          label: "Start Date",
                          icon: <FaRegCalendar />,
                        }}
                        control={form.control}
                      />
                    </div>
                    <div>
                      <CustomFormField
                        props={{
                          placeholder: "Select date",
                          name: `achievements.${index}.endDate`,
                          fieldType: "year",
                          label: "End Date",
                          icon: <FaRegCalendar />,
                        }}
                        control={form.control}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <CustomFormField
                        props={{
                          placeholder: "Select date",
                          name: `achievements.${index}.startDate`,
                          fieldType: "month",
                          label: "Start Date",
                          icon: <FaRegCalendar />,
                        }}
                        control={form.control}
                      />
                    </div>
                    <div>
                      <CustomFormField
                        props={{
                          placeholder: "Select date",
                          name: `achievements.${index}.endDate`,
                          fieldType: "month",
                          label: "End Date",
                          icon: <FaRegCalendar />,
                        }}
                        control={form.control}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-end">
                <Label className="flex cursor-pointer items-center justify-center space-x-2">
                  <span>Show year only</span>
                  <Checkbox
                    checked={yearOnly}
                    onCheckedChange={() => {
                      form.setValue(`achievements.${index}.startDate`, "");
                      form.setValue(`achievements.${index}.endDate`, "");
                      setYearOnly((prev) => !prev);
                    }}
                    disabled={false}
                  />
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AchievementForm;
