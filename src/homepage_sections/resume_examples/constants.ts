export interface ExampleValues {
  category: string;
  title: string;
  image: string;
}
export const examples = [
  {
    category: "medical",
    title: "",
    image: "/ats-template-1.png",
  },
  {
    category: "engineering",
    title: "",
    image: "/ats-template-1.png",
  },
  {
    category: "finance",
    title: "",
    image: "/ats-template-1.png",
  },
  {
    category: "education",
    title: "",
    image: "/ats-template-1.png",
  },
  {
    category: "technology",
    title: "",
    image: "/ats-template-1.png",
  },
  {
    category: "marketing",
    title: "",
    image: "/ats-template-1.png",
  },
];

export const categories: string[] = [
  ...new Set(examples.map((item) => item.category)),
];
