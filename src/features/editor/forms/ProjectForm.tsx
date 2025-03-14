"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProjectSchema, ProjectValues } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import CustomFormField from "../components/CustomFormField";
import { EditorFormProps } from "../constants/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa6";

import {
  educationDetailsDefValues,
  projectDetailsDefValues,
} from "@/validations/defaultValues";
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

const ProjectForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<ProjectValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      projects: resumeData.projects || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        projects: values.projects?.filter((item) => item !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    name: "projects",
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
      <h1 className="text-xl font-bold">Projects</h1>
      <p className="mt-2">Add your projects</p>
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
                  <ProjectItem
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

interface ProjectItemProps {
  id: string;
  form: UseFormReturn<ProjectValues>;
  index: number;
  remove: (index: number) => void;
}

const ProjectItem = ({ id, form, index, remove }: ProjectItemProps) => {
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
                  {form.watch("projects")?.[index]?.name || "Untitled"}
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
                  <div className="flex justify-end">
                    {/* <AIEdicationDetailsGenerator form={form} index={index} /> */}
                  </div>
                  <CustomFormField
                    props={{
                      name: `projects.${index}.name`,
                      fieldType: "text",
                      label: "Name",
                      placeholder: "Project Name",
                    }}
                    control={form.control}
                  />
                  <CustomFormField
                    props={{
                      name: `projects.${index}.link`,
                      fieldType: "text",
                      label: "Link",
                      placeholder: "Project Link",
                    }}
                    control={form.control}
                  />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <CustomFormField
                      props={{
                        name: `projects.${index}.description`,
                        fieldType: "textarea",
                        label: "Description",
                        placeholder: "Describe your experience/learnings",
                      }}
                      control={form.control}
                    />
                    <CustomFormField
                      props={{
                        name: `projects.${index}.date`,
                        fieldType: "date",
                        label: "Date",
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

export default ProjectForm;

// const AIProjectsGenerator = ({
//   form,
//   index,
// }: {
//   form: UseFormReturn<ProjectValues>;
//   index: number;
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState<boolean>(false);

//   const descForm = useForm<GenerateEducationDetailsValues>({
//     resolver: zodResolver(GenerateEducationDetailsSchema),
//     defaultValues: { description: "" },
//     mode: "onChange",
//   });

//   async function handleClick(desc: string) {
//     try {
//       setLoading(true);
//       const result = await generateEducationDetails({
//         description: desc,
//       });
//       if (result.error) {
//         const tID = toast.error(
//           <div className="flex items-center justify-between space-x-1 ps-1">
//             <p className="text-sm">{result.error}</p>
//             <Button
//               className="text-xs"
//               size={"sm"}
//               variant={"secondary"}
//               onClick={() => toast.dismiss(tID)}
//             >
//               Cancel
//             </Button>
//           </div>,
//           { position: "bottom-center" },
//         );
//       } else if (result.success) {
//         const {
//           degree,
//           institution,
//           score,
//           startDate,
//           endDate,
//           current,
//           description,
//         } = result.success.content;
//         form.setValue(
//           `educationDetails.${index}.degree`,
//           degree ? degree : educationDetailsDefValues.degree,
//         );
//         form.setValue(
//           `educationDetails.${index}.institution`,
//           institution ? institution : educationDetailsDefValues.institution,
//         );
//         form.setValue(
//           `educationDetails.${index}.startDate`,
//           startDate ? startDate : educationDetailsDefValues.startDate,
//         );
//         form.setValue(
//           `educationDetails.${index}.endDate`,
//           endDate ? endDate : educationDetailsDefValues.endDate,
//         );
//         form.setValue(
//           `educationDetails.${index}.description`,
//           description ? description : educationDetailsDefValues.description,
//         );
//         form.setValue(
//           `educationDetails.${index}.score`,
//           score ? score : educationDetailsDefValues.score,
//         );
//         form.setValue(
//           `educationDetails.${index}.current`,
//           current ? current : educationDetailsDefValues.current,
//         );
//       }
//     } catch (error) {
//       toast.error("Something went wrong", { position: "bottom-center" });
//       console.log(error);
//     } finally {
//       setLoading(false);
//       setOpen(false);
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger>
//         <div>
//           <AIButton />
//         </div>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>
//             <p className="flex items-center space-x-2">
//               <FaWandMagicSparkles />
//               <span>Take help from AI</span>
//             </p>
//           </DialogTitle>
//           <DialogDescription>
//             Describe a little about your degree, like your score, experience,
//             work you did, starting and ending dates etc.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <Form {...descForm}>
//             <CustomFormField
//               control={descForm.control}
//               props={{
//                 fieldType: "textarea",
//                 name: "description",
//                 label: "Description",
//                 placeholder:
//                   "eg: I did B.Tech in CSE from IIT Delhi from 2020 to 2024 with a cgpa score of 9.4. I engaged myself in hackathons and networking events",
//               }}
//             />
//           </Form>
//         </div>
//         <DialogFooter>
//           <Button
//             disabled={loading}
//             onClick={() => {
//               const isValid = descForm.trigger();
//               if (!isValid) return;
//               const description = descForm.watch("description");
//               if (description) handleClick(description);
//             }}
//             type="submit"
//           >
//             {loading && <LuLoaderCircle className="animate-spin" />}
//             {!loading && <FaWandMagicSparkles />}
//             Generate
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
