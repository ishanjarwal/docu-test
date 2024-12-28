import { resumeSchemaType } from "@/validations/validation";

export interface EditorFormProps {
  resumeData: resumeSchemaType;
  setResumeData: (data: resumeSchemaType) => void;
}
