import 'Styling/index.css'

import { GameInfoLoader } from 'Game/loader/gameInfoLoader'
import { GameInfo, IGameInfoLoader } from 'Types/game/data/gameInfo'
import { IResourceProvider } from 'Types/utils'
import { ResourceProvider } from 'Utils/resourceProvider'
import { logInfo } from 'Utils/logMessage'


const start = async () => {
    const resourceProvider: IResourceProvider = new ResourceProvider('./data/')
    const gameInfoLoader: IGameInfoLoader = new GameInfoLoader('game.json', resourceProvider)
    const gameInfo: GameInfo = await gameInfoLoader.load()
    logInfo('Game info loaded: {0}', gameInfo)

}
start()
