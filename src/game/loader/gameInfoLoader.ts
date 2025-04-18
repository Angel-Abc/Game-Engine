import { GameInfo, GameInfoSchema, IGameInfoLoader } from 'Types/loader/gameInfo'
import { IResourceProvider } from 'Types/utils'

export class GameInfoLoader implements IGameInfoLoader {
    constructor(private path: string, private resourceProvder: IResourceProvider) { }
    async load(): Promise<GameInfo> {
        const result = await this.resourceProvder.loadJson<GameInfo>(GameInfoSchema, this.path)
        return result
    }
}