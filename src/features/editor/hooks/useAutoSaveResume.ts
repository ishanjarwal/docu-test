import useDebounce from "@/hooks/useDebounce";
import { resumeSchemaType } from "@/validations/validation";
import isEqual from "lodash.isequal";
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

      setLastSaved(structuredClone(debouncedData));
      setIsSaving(false);
    };

    const hasUnsavedChanges = !isEqual(debouncedData, lastSaved);

    if (hasUnsavedChanges && debouncedData && !isSaving) {
      save();
    }
  }, [debouncedData, lastSaved, isSaving]);

  return {
    isSaving,
    hasUnsavedChanges: !isEqual(resumeData, lastSaved),
  };
};

export default useAutoSaveResume;
