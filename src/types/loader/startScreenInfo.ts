import { z } from 'zod'

const GridSchema = z.object({
    rows: z.number().int().min(2).max(32),
    columns: z.number().int().min(2).max(32)
})

const DialogSchema = z.object({
    row: z.number().int().min(2).max(32),
    column: z.number().int().min(2).max(32),
    width: z.number().int().min(2).max(30),
    height: z.number().int().min(2).max(30)
})

export const StartScreenInfoSchema = z.object({
    image: z.string().nonempty(),
    grid: GridSchema,
    dialog: DialogSchema
})
export type StartScreenInfo = z.infer<typeof StartScreenInfoSchema>

export interface IStartScreenInfoLoader {
    load(): Promise<StartScreenInfo>
}