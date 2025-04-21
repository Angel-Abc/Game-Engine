import { z } from 'zod'

export const GameInfoSchema = z.object({
    title: z.string().nonempty(),
    'start-screen': z.string().nonempty(),
    'game-data':z.string().nonempty(),
})
export type GameInfo = z.infer<typeof GameInfoSchema>

