"use client";
import { Form } from "@/components/ui/form";
import {
  CerificationsSchema,
  CertificationType,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { FaChevronDown } from "react-icons/fa6";
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
import { certificationDefValues } from "@/validations/defaultValues";

const CertificationsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<CertificationType>({
    resolver: zodResolver(CerificationsSchema),
    defaultValues: {
      certifications: resumeData.certifications || [certificationDefValues],
    },
  });

  const { append, remove, fields, move } = useFieldArray({
    name: "certifications",
    control: form.control,
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        certifications:
          values.certifications?.filter((item) => item !== undefined) || [],
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
      <h1 className="text-xl font-bold">Certifications</h1>
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
                  <CertificationItem
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
            onClick={() => append(certificationDefValues)}
          >
            Add More
            <IoMdAdd />
          </Button>
        </Form>
      </div>
    </div>
  );
};

interface CertificationItemProps {
  id: string;
  form: UseFormReturn<CertificationType>;
  index: number;
  remove: UseFieldArrayRemove;
  control: Control<CertificationType>;
}

const CertificationItem = ({
  id,
  form,
  index,
  remove,
  control,
}: CertificationItemProps) => {
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
                  {form.watch("certifications")?.[index]?.title || "untitled"}
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
                      name: `certifications.${index}.title`,
                      fieldType: "text",
                      label: "Certificate title",
                      placeholder: "The title of your certifciate",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <CustomFormField
                    props={{
                      name: `certifications.${index}.organization`,
                      fieldType: "text",
                      label: "Organization",
                      placeholder: "Certificate issuer",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <CustomFormField
                    props={{
                      name: `certifications.${index}.link`,
                      fieldType: "text",
                      label: "Link to your certificate",
                      placeholder: "Link to your certificate",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2">
                  <CustomFormField
                    props={{
                      name: `certifications.${index}.description`,
                      fieldType: "textarea",
                      label: "Description",
                      placeholder: "Describe your experience/learnings",
                    }}
                    control={control}
                  />
                </div>
                <div className="col-span-2">
                  <CustomFormField
                    props={{
                      name: `certifications.${index}.score`,
                      fieldType: "text",
                      label: "Score",
                      placeholder: "Your score",
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

export default CertificationsForm;
