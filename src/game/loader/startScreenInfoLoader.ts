import { IStartScreenInfoLoader, StartScreenInfo, StartScreenInfoSchema } from 'Types/loader/startScreenInfo'
import { IResourceProvider } from 'Types/utils'

export class StartScreenInfoLoader implements IStartScreenInfoLoader {
    constructor(private path: string, private resourceProvider: IResourceProvider) { }
    async load(): Promise<StartScreenInfo> {
        return this.resourceProvider.loadJson(StartScreenInfoSchema, this.path)
    }
}