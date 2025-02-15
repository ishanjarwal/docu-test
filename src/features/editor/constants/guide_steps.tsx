import { StepType } from "@reactour/tour";

export const joyrideSteps: StepType[] = [
  {
    selector: "none",
    position: "center",
    content: (
      <div>
        <h2 className="font-bold">👋🏻 Hey folk, let's take a tour</h2>
        <p className="text-sm">learn the basics of using the app</p>
      </div>
    ),
  },
  {
    selector: ".step1",
    content: (
      <div>
        <h2 className="font-bold">Change the resume title</h2>
        {/* <p>This is the second step of the guide.</p> */}
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
        {/* <p>This is the fourth step of the guide.</p> */}
      </div>
    ),
  },
  {
    selector: ".step4",
    content: (
      <div>
        <h2 className="font-bold">See the preview of your resume</h2>
        {/* <p>This is the fourth step of the guide.</p> */}
      </div>
    ),
  },
  {
    selector: ".step5",
    action: () => {
      if (document.documentElement.offsetWidth >= 1024) return;
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set("preview", "true");
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    },
    actionAfter: () => {
      if (document.documentElement.offsetWidth >= 1024) return;
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.delete("preview");
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    },
    content: (
      <div>
        <h2 className="font-bold">
          Change templates and customize according to your needs
        </h2>
        {/* <p>This is the fourth step of the guide.</p> */}
      </div>
    ),
  },
];
export default joyrideSteps;
