import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IoMdMic } from "react-icons/io";
import "./style.css";

const VoiceButton = ({
  toggleListening,
  listening,
}: {
  toggleListening: () => void;
  listening: boolean;
}) => {
  return (
    <Button
      onClick={toggleListening}
      size={"icon"}
      className={cn(
        "rounded-full border bg-white text-black shadow-xl duration-150",
        listening && "bg-primary",
      )}
    >
      {listening ? <span className="loader"></span> : <IoMdMic />}
    </Button>
  );
};

export default VoiceButton;
