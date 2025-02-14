import { Step } from "react-joyride";

export const joyrideSteps: Step[] = [
  {
    target: ".step1",
    content: (
      <div>
        <h2>Step 1</h2>
        <p>This is the first step of the guide.</p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: ".step2",
    content: (
      <div>
        <h2>Step 2</h2>
        <p>This is the second step of the guide.</p>
      </div>
    ),
    placement: "top",
  },
  {
    target: ".step3",
    content: (
      <div>
        <h2>Step 3</h2>
        <p>This is the third step of the guide.</p>
      </div>
    ),
    placement: "right",
  },
  {
    target: ".step4",
    content: (
      <div>
        <h2>Step 4</h2>
        <p>This is the fourth step of the guide.</p>
      </div>
    ),
    placement: "left",
  },
];

export default joyrideSteps;
