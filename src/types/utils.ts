import z from 'zod'

export interface IResourceProvider {
    loadJson<T>(schema: z.ZodType<T>, path: string): Promise<T>
}