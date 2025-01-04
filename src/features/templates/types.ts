import { resumeSchemaType } from "@/validations/validation";

export interface TemplateProps {
  resumeData: resumeSchemaType;
  setResumeData: (data: resumeSchemaType) => void;
}
