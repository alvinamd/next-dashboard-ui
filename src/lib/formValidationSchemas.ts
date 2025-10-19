import {z} from "zod"

export const documentSchema = z.object({
  id: z.string(),
  title: z
      .string()
      .min(1, { message: "Title is required" }),
    yearPublished: z.number({ message: "Publication year is required!" })
      .min(1900, { message: "Year must be at least 1900" })
      .max(2100, { message: "Year must be at most 2100" }),
    docType: z.enum(['TYPE1', 'TYPE2', 'TYPE3', 'TYPE4', 'TYPE5', 'TYPE6', 'TYPE7', 'TYPE8'], { message: "Document type is required!" }),
    img: z.instanceof(File, { message: "Cover is required" }),
  });

  export type DocumentSchema = z.infer<typeof documentSchema>;