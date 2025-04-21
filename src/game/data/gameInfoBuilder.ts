import { GameInfo, IGameInfoBuilder } from 'Types/game/data/gameInfo'
import { GameInfo as LoadedGameInfo } from 'Types/game/loader/gameInfo'

export class GameInfoBuilder implements IGameInfoBuilder {
    build(gameInfo: LoadedGameInfo): GameInfo {
        return {
            title: gameInfo.title,
            startScreenFile: gameInfo['start-screen'],
            gameDataFile: gameInfo['game-data'],
        }
    }
}