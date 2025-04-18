import { z } from 'zod'

export const StartScreenInfoSchema = z.object({
    image: z.string().nonempty()
})
export type StartScreenInfo = z.infer<typeof StartScreenInfoSchema>

export interface IStartScreenInfoLoader {
    load(): Promise<StartScreenInfo>
}