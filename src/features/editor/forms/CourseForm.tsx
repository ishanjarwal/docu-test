"use client";
import { Form } from "@/components/ui/form";
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
import {
  CommonAchievementSchema,
  CommonAchievementValues,
} from "@/validations/validation";
import { z } from "zod";
import { commonAchievementDefValues } from "@/validations/defaultValues";

interface CourseValues {
  courses?: CommonAchievementValues;
}
const CourseSchema = z.object({ courses: CommonAchievementSchema });

const CourseForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<CourseValues>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      courses: resumeData.courses || [],
    },
  });

  const { append, remove, fields, move } = useFieldArray({
    name: "courses",
    control: form.control,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        courses: values.courses?.filter((item) => item !== undefined) || [],
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
      <h1 className="text-xl font-bold">Courses</h1>
      <p className="mt-2">Add your courses</p>
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
                  <CourseItem
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

interface CourseItemProps {
  id: string;
  form: UseFormReturn<CourseValues>;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<CourseValues>;
}

const CourseItem = ({ id, form, index, remove, control }: CourseItemProps) => {
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
                  {form.watch("courses")?.[index]?.title || "untitled"}
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
                      name: `courses.${index}.title`,
                      fieldType: "text",
                      label: "Course title",
                      placeholder: "The title of your course",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <CustomFormField
                    props={{
                      name: `courses.${index}.organization`,
                      fieldType: "text",
                      label: "Organization",
                      placeholder: "Course provider organization",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <CustomFormField
                    props={{
                      name: `courses.${index}.link`,
                      fieldType: "text",
                      label: "Link your course completion",
                      placeholder: "Link your course completion",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2">
                  <CustomFormField
                    props={{
                      name: `courses.${index}.description`,
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
                      name: `courses.${index}.score`,
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
                          name: `courses.${index}.startDate`,
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
                          name: `courses.${index}.endDate`,
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
                          name: `courses.${index}.startDate`,
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
                          name: `courses.${index}.endDate`,
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
                      form.setValue(`courses.${index}.startDate`, "");
                      form.setValue(`courses.${index}.endDate`, "");
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

export default CourseForm;
