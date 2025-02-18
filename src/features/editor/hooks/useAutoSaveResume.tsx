import { saveResume } from "@/app/(main)/editor/action";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { fileReplacer } from "@/lib/utils";
import { resumeSchemaType } from "@/validations/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useAutoSaveResume = (resumeData: resumeSchemaType) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const debouncedData = useDebounce(resumeData, 3000);
  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSaved, setLastSaved] = useState(structuredClone(resumeData));

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedData]);

  useEffect(() => {
    const save = async () => {
      try {
        setIsError(false);
        setIsSaving(true);

        const newData = structuredClone(debouncedData);

        const sendable = {
          ...newData,
          personalDetails: {
            ...newData.personalDetails,
            ...(JSON.stringify(
              lastSaved.personalDetails.profilePicture,
              fileReplacer,
            ) ===
              JSON.stringify(
                newData.personalDetails.profilePicture,
                fileReplacer,
              ) && { profilePicture: undefined }),
          },
          id: resumeId,
        };
        const updatedResume = await saveResume(sendable);

        setResumeId(updatedResume.id);
        setLastSaved(newData);

        // set the id in params for the first time
        if (searchParams.get("id") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("id", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    };

    const hasUnsavedChanges =
      JSON.stringify(debouncedData, fileReplacer) !==
      JSON.stringify(lastSaved, fileReplacer);
    if (hasUnsavedChanges && debouncedData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedData,
    lastSaved,
    isSaving,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData, fileReplacer) !==
      JSON.stringify(lastSaved, fileReplacer),
  };
};

export default useAutoSaveResume;
