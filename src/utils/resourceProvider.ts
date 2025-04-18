import z from 'zod'
import request from 'Utils/apiClient'
import { combine } from 'Utils/pathTools'
import { fatalError, logDebug } from './logMessage'
import { IResourceProvider } from 'Types/utils'

export class ResourceProvider implements IResourceProvider {
    constructor(private path: string) { }

    public getFilePath(filePath: string) {
        if (!filePath.startsWith(this.path)) {
            return combine(this.path, filePath)
        }
        return filePath
    }

    public async loadJson<T>(schema: z.ZodType<T>, path: string): Promise<T> {
        const filePath = this.getFilePath(path)
        try {
            const jsonString = await request.getString(filePath)
            const jsonData = JSON.parse(jsonString)
            logDebug('Loaded json object {0} from path {1}', jsonData, filePath)
            const result = schema.parse(jsonData) as T
            logDebug('Resulting in validated object {0}', result)
            return result
        } catch (error) {
            if (error instanceof SyntaxError)
                fatalError('Invalid JSON format in file "{0}" with message {1}', filePath, error.message)
            else if (error instanceof z.ZodError)
                fatalError('Validation error in file "{0}" with message {1}', filePath, error.message)
            else
                fatalError('Failed to load file "{0}" with message {1}', filePath, error)
        }
    }

}