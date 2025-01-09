"use client";
import React, { useEffect } from "react";
import { EditorFormProps } from "../constants/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  WorkExperienceSchema,
  WorkExperienceType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "../components/CustomFormField";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiTrash } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
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
import { workExperienceDefValues } from "@/validations/defaultValues";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExperienceType>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [workExperienceDefValues],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((item) => item !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    name: "workExperiences",
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
      <h1 className="text-xl font-bold">Work Experiences</h1>
      <p className="mt-2">Add your work history</p>
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
                  <WorkExperienceItem
                    id={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    key={field.id}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <Button className="py-6 text-foreground" onClick={() => append({})}>
              Add More
              <IoMdAdd />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceType>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({
  id,
  form,
  index,
  remove,
}: WorkExperienceItemProps) => {
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
                  className="rotate-90 cursor-grab !touch-none text-xl focus:outline-none"
                  {...listeners}
                  {...attributes}
                />
              </div>
              <div className="flex w-full items-center justify-between truncate">
                <p className="truncate text-lg font-semibold">
                  {form.watch("workExperiences")?.[index]?.position ||
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
                      name: `workExperiences.${index}.position`,
                      fieldType: "text",
                      label: "Job Title",
                      placeholder: "Your position at this job",
                    }}
                    control={form.control}
                  />
                  <CustomFormField
                    props={{
                      name: `workExperiences.${index}.employer`,
                      fieldType: "text",
                      label: "Employer",
                      placeholder: "Employer Name",
                    }}
                    control={form.control}
                  />
                  <CustomFormField
                    props={{
                      name: `workExperiences.${index}.description`,
                      fieldType: "textarea",
                      label: "Description",
                      placeholder: "Describe your experience",
                    }}
                    control={form.control}
                  />
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <CustomFormField
                        props={{
                          name: `workExperiences.${index}.location`,
                          fieldType: "text",
                          label: "Location",
                          placeholder: "Your job location",
                          disabled:
                            form.watch("workExperiences")?.[index]?.jobType ===
                            "on-site"
                              ? false
                              : true,
                        }}
                        control={form.control}
                      />
                    </div>
                    <div className="col-span-6 md:col-span-4">
                      <CustomFormField
                        props={{
                          name: `workExperiences.${index}.startDate`,
                          fieldType: "date",
                          label: "Start Date",
                        }}
                        control={form.control}
                      />
                    </div>
                    <div className="col-span-6 md:col-span-4">
                      <CustomFormField
                        props={{
                          name: `workExperiences.${index}.endDate`,
                          fieldType: "date",
                          label: "End Date",
                          disabled: form.watch("workExperiences")?.[index]
                            .current
                            ? true
                            : false,
                        }}
                        control={form.control}
                      />
                    </div>
                  </div>
                  <div>
                    <CustomFormField
                      props={{
                        name: `workExperiences.${index}.jobType`,
                        fieldType: "radio",
                        label: "Job Type",
                        options: [
                          { label: "On-site", value: "on-site" },
                          { label: "Remote", value: "remote" },
                          { label: "Hybrid", value: "hybrid" },
                        ],
                      }}
                      control={form.control}
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-2 px-2 py-2">
                    <CustomFormField
                      props={{
                        name: `workExperiences.${index}.current`,
                        fieldType: "checkbox",
                        label: "Currently working here",
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

export default WorkExperienceForm;
