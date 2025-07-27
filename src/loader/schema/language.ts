import { z } from 'zod'

export const languageSchema = z.object({
    name: z.string(),
    translations: z.record(z.string(), z.string())
})
export type Language = z.infer<typeof languageSchema>