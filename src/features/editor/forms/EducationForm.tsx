"use client";
import React, { useEffect } from "react";
import { EditorFormProps } from "../constants/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  EducationDetailsSchema,
  EducationDetailsType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "../components/CustomFormField";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { FiTrash } from "react-icons/fi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaChevronDown } from "react-icons/fa6";
import clsx from "clsx";

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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { educationDetailsDefValues } from "@/validations/defaultValues";

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationDetailsType>({
    resolver: zodResolver(EducationDetailsSchema),
    defaultValues: {
      educationDetails: resumeData.educationDetails || [
        educationDetailsDefValues,
      ],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        educationDetails:
          values.educationDetails?.filter((edu) => edu !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    name: "educationDetails",
    control: form.control,
  });

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
      <h1 className="text-xl font-bold">Educational Details</h1>
      <p className="mt-2">Add your educational qualifications</p>
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
                  <EducationItem
                    id={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    key={field.id}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <Button
              className="py-6 text-foreground"
              onClick={() => append(educationDetailsDefValues)}
            >
              Add More
              <IoMdAdd />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationDetailsType>;
  index: number;
  remove: (index: number) => void;
}

const EducationItem = ({ id, form, index, remove }: EducationItemProps) => {
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
        className={clsx(
          "rounded-lg border border-border bg-background px-2 py-4 md:px-4",
          isDragging && "relative z-50 cursor-grab shadow-xl",
        )}
        collapsible
        defaultValue={"item-1"}
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="truncate py-0 outline-none">
            <div className="flex w-full items-center justify-between gap-x-4">
              <div>
                <MdDragIndicator
                  {...attributes}
                  {...listeners}
                  className="rotate-90 cursor-grab !touch-none text-xl focus:outline-none"
                />
              </div>
              <div className="flex w-full items-center justify-between truncate">
                <p className="truncate text-lg font-semibold">
                  {form.watch("educationDetails")?.[index]?.degree ||
                    "Untitled"}
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
            <div className="relative flex flex-col items-stretch md:flex-row">
              <div className="flex-1 px-2 py-4 md:px-4">
                <div className="mt-4 grid grid-cols-1 gap-y-4">
                  <CustomFormField
                    props={{
                      name: `educationDetails.${index}.degree`,
                      fieldType: "text",
                      label: "Degree",
                      placeholder: "Degree name",
                    }}
                    control={form.control}
                  />
                  <CustomFormField
                    props={{
                      name: `educationDetails.${index}.institution`,
                      fieldType: "text",
                      label: "Institution",
                      placeholder: "Institution Name",
                    }}
                    control={form.control}
                  />
                  <CustomFormField
                    props={{
                      name: `educationDetails.${index}.description`,
                      fieldType: "textarea",
                      label: "Description",
                      placeholder: "Describe your experience/learnings",
                    }}
                    control={form.control}
                  />
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <CustomFormField
                        props={{
                          name: `educationDetails.${index}.score`,
                          fieldType: "text",
                          label: "Score/GPA",
                          placeholder: "Your Score",
                        }}
                        control={form.control}
                      />
                    </div>
                    <div className="col-span-6 md:col-span-4">
                      <CustomFormField
                        props={{
                          name: `educationDetails.${index}.startDate`,
                          fieldType: "date",
                          label: "Start Date",
                        }}
                        control={form.control}
                      />
                    </div>
                    <div className="col-span-6 md:col-span-4">
                      <CustomFormField
                        props={{
                          name: `educationDetails.${index}.endDate`,
                          fieldType: "date",
                          label: "End Date",
                          disabled: form.watch("educationDetails")?.[index]
                            .current
                            ? true
                            : false,
                        }}
                        control={form.control}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 px-2 py-2">
                    <CustomFormField
                      props={{
                        name: `educationDetails.${index}.current`,
                        fieldType: "checkbox",
                        label: "Currently studying here",
                      }}
                      control={form.control}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EducationForm;
