import z from "zod";

export const urlSchema = z.object({
  longUrl: z.string(),
});

export type urlType = z.infer<typeof urlSchema>;
