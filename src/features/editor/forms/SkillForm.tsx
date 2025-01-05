"use client";
import { Form } from "@/components/ui/form";
import { SkillSchema, SkillType } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import {
  Control,
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayMove,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { EditorFormProps } from "../constants/types";
import CustomFormField from "../components/CustomFormField";
import { Button } from "@/components/ui/button";
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

const SkillForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      hardSkills: resumeData.hardSkills || [{ name: "", level: 0 }],
      softSkills: resumeData.softSkills || [{ name: "", level: 0 }],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        hardSkills: values.hardSkills?.filter((edu) => edu !== undefined) || [],
        softSkills: values.softSkills?.filter((edu) => edu !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const {
    fields: hardSkillsfields,
    append: hardSkillappend,
    remove: hardSkillremove,
    move: hardSkillMove,
  } = useFieldArray({
    name: "hardSkills",
    control: form.control,
  });

  const {
    fields: softSkillsfields,
    append: softSkillappend,
    remove: softSkillremove,
    move: softSkillMove,
  } = useFieldArray({
    name: "softSkills",
    control: form.control,
  });

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(
    event: DragEndEvent,
    fields: FieldArrayWithId<any>[],
    move: UseFieldArrayMove,
  ) {
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
      <Form {...form}>
        <div>
          <h1 className="text-xl font-bold">Hard Skills</h1>
          <p className="mt-2">Add your hard skills</p>
          <div className="mt-8">
            <div>
              <div className="flex flex-col gap-y-8">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(e) => {
                    handleDragEnd(e, hardSkillsfields, hardSkillMove);
                  }}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={hardSkillsfields}
                    strategy={verticalListSortingStrategy}
                  >
                    {hardSkillsfields.map((field, index) => (
                      <SkillItem
                        id={field.id}
                        key={field.id}
                        index={index}
                        control={form.control}
                        arrayName="hardSkills"
                        remove={hardSkillremove}
                        form={form}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
                <Button
                  className="py-6 text-foreground"
                  onClick={() =>
                    hardSkillappend({ name: "", level: 0, levelDisabled: true })
                  }
                >
                  Add More
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* soft skills */}
        <div className="mt-16">
          <h1 className="text-xl font-bold">Soft Skills</h1>
          <p className="mt-2">Add your Soft skills</p>
          <div className="mt-8">
            <div>
              <div className="flex flex-col gap-y-8">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(e) => {
                    handleDragEnd(e, softSkillsfields, softSkillMove);
                  }}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={softSkillsfields}
                    strategy={verticalListSortingStrategy}
                  >
                    {softSkillsfields.map((field, index) => (
                      <SkillItem
                        id={field.id}
                        key={field.id}
                        index={index}
                        control={form.control}
                        arrayName="softSkills"
                        remove={softSkillremove}
                        form={form}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
                <Button
                  className="py-6 text-foreground"
                  onClick={() =>
                    softSkillappend({ name: "", level: 0, levelDisabled: true })
                  }
                >
                  Add More
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

interface SkillItemProps {
  id: string;
  form: UseFormReturn<SkillType>;
  index: number;
  control: Control<SkillType>;
  arrayName: string;
  remove: (index: number) => void;
}

const SkillItem = ({
  id,
  form,
  index,
  control,
  arrayName,
  remove,
}: SkillItemProps) => {
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
                  {form.watch((arrayName as "hardSkills") || "softSkills")?.[
                    index
                  ]?.name || "Untitled"}
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
              <div className="flex w-full flex-col px-2 py-4 md:px-4">
                <div className="flex w-full flex-col items-start justify-center gap-4 md:flex-row">
                  <div className="w-full flex-1">
                    <CustomFormField
                      props={{
                        fieldType: "text",
                        label: "Skill Name",
                        name: `${arrayName}.${index}.name`,
                        placeholder: "Skill name",
                      }}
                      control={control}
                    />
                  </div>
                  <div className="w-full flex-1">
                    <CustomFormField
                      props={{
                        fieldType: "range",
                        label: "Skill Level",
                        name: `${arrayName}.${index}.level`,
                        rangeLabels: ["1", "2", "3", "4", "5"],
                        rangeMax: 4,
                        rangeStep: 1,
                        disabled: form.watch(
                          arrayName as "hardSkills" | "softSkills",
                        )?.[index]?.levelDisabled,
                      }}
                      control={control}
                    />
                    <div className="mt-4">
                      <CustomFormField
                        props={{
                          fieldType: "checkbox",
                          label: "Disable Level",
                          name: `${arrayName}.${index}.levelDisabled`,
                        }}
                        control={control}
                      />
                    </div>
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

export default SkillForm;
