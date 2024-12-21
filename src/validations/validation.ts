// import { z } from "zod";

// // const optionalString = z.string().trim().optional().or(z.literal(""));

// export const projectTitleSchema = z.object({
//   title: z
//     .string()
//     .transform((val) =>
//       val?.trim() === "" || val == null || val === undefined ? "Untitled" : val,
//     ),
// });

// export type projectTitleType = z.infer<typeof projectTitleSchema>;
