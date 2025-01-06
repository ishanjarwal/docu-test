import useDebounce from "@/hooks/useDebounce";
import { resumeSchemaType } from "@/validations/validation";
import { useEffect, useState } from "react";

const useAutoSaveResume = (resumeData: resumeSchemaType) => {
  const debouncedData = useDebounce(resumeData, 1500);

  const [lastSaved, setLastSaved] = useState(structuredClone(resumeData));
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const save = async () => {
      setIsSaving(true);
      // mimicking the save
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLastSaved(debouncedData);
      setIsSaving(false);
    };

    const hasUnsavedChanges =
      JSON.stringify(debouncedData) != JSON.stringify(lastSaved);

    if (hasUnsavedChanges && debouncedData && !isSaving) {
      save();
    }
  }, [debouncedData, lastSaved, isSaving]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(resumeData) != JSON.stringify(lastSaved),
  };
};

export default useAutoSaveResume;
