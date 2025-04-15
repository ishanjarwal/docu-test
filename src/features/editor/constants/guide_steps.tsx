import { StepType } from "@reactour/tour";

export const joyrideSteps: StepType[] = [
  {
    selector: "none",
    position: "center",
    content: (
      <div>
        <h2 className="font-bold">👋🏻 Hey folk, let&apos;s take a tour</h2>
        <p className="text-sm">learn the basics of using the app</p>
      </div>
    ),
  },
  {
    selector: ".step1",
    content: (
      <div>
        <h2 className="font-bold">Change the resume title</h2>
      </div>
    ),
  },
  {
    selector: ".step2",
    content: (
      <div>
        <h2 className="font-bold">Switch between forms</h2>
        <p>switch between different forms to add new sections</p>
      </div>
    ),
  },
  {
    selector: ".step3",
    content: (
      <div>
        <h2 className="font-bold">Move to next/previous form</h2>
      </div>
    ),
  },
  {
    selector: ".step4",
    content: (
      <div>
        <h2 className="font-bold">
          Change templates and customize according to your needs
        </h2>
      </div>
    ),
  },
  {
    selector: ".step5",
    content: (
      <div>
        <h2 className="font-bold">See the preview of your resume</h2>
      </div>
    ),
  },
  {
    selector: ".step6",
    content: (
      <div>
        <h2 className="font-bold">Download your Resume in High-Quality PDF.</h2>
      </div>
    ),
  },
];
export default joyrideSteps;
