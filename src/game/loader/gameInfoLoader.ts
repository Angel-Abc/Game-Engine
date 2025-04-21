import { GameInfoBuilder } from 'Game/data/gameInfoBuilder'
import { GameInfo, IGameInfoLoader } from 'Types/game/data/gameInfo'
import { GameInfo as LoadedGameInfo, GameInfoSchema } from 'Types/game/loader/gameInfo'
import { IResourceProvider } from 'Types/utils'

export class GameInfoLoader implements IGameInfoLoader {
    constructor(private path: string, private resourceProvder: IResourceProvider) { }
    async load(): Promise<GameInfo> {
        const gameInfo = await this.resourceProvder.loadJson<LoadedGameInfo>(GameInfoSchema, this.path)
        const gameInfoBuilder = new GameInfoBuilder()
        return gameInfoBuilder.build(gameInfo)
    }
}