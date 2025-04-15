import { resumeSchemaType } from "@/validations/validation";
import { templates } from "../editor/constants/templates";
import ATSTemplate1 from "./ats/ats_template_1/ATSTemplate1";

const currentTemplate = (resumeData: resumeSchemaType) => {
  const Template =
    templates.find((el) => el.id === resumeData.template.templateId)
      ?.template || ATSTemplate1;

  return Template;
};

export default currentTemplate;
