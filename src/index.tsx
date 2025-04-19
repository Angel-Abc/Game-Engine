import { createRoot } from 'react-dom/client'
import { GameInfoLoader } from 'Game/loader/gameInfoLoader'
import { ResourceProvider } from 'Utils/resourceProvider'
import { logInfo } from 'Utils/logMessage'
import { IEngine } from 'Types/engine/engine'
import { IResourceProvider } from 'Types/utils'
import { GameInfo, IGameInfoLoader } from 'Types/loader/gameInfo'
import { App } from 'Game/app/app'
import { Engine } from 'Game/engine/engine'

/*
import './index.css'
import { Button } from '@/components/ui/button'
import { ChangeTracker } from './state/changeTracker'
import { StateManager } from './state/stateManager'
import { IChangeTracker, IStateManager } from 'Types/state'
*/

const start = async() => {
    const resourceProvider: IResourceProvider = new ResourceProvider('./data/')
    const gameInfoLoader: IGameInfoLoader = new GameInfoLoader('game.json', resourceProvider)
    const gameInfo: GameInfo = await gameInfoLoader.load()
    logInfo('Game info loaded: {0}', gameInfo)

    const engine: IEngine = new Engine(resourceProvider, {
        title: gameInfo.title,
        startScreenFile: gameInfo['start-screen'],
        gameDataFile: gameInfo['game-data'],
    })
    document.body.innerHTML = '<div id="app"></div>'
    const root = createRoot(document.getElementById('app')!)
    root.render(
        <App />
    )
    await engine.start()
}
start()

/*

const changeTracker: IChangeTracker = new ChangeTracker()
const initialData = {
    test: {
        nested: 'a'
    }
}
const stateManager: IStateManager<typeof initialData> = new StateManager(initialData, changeTracker)

const state = stateManager.state
state.test.nested = 'b'
stateManager.commitTurn()
state.test.nested = 'c'

const saveData = stateManager.save()
logInfo('Save data: {0}', saveData)

stateManager.rollbackTurn()
stateManager.rollbackTurn()
logInfo('After rollback: {0}', state.test.nested)

stateManager.load(saveData)
logInfo('After load: {0}', state.test.nested)

document.body.innerHTML = '<div id="app"></div>'
const root = createRoot(document.getElementById('app')!)


root.render(
    <>
        <h1>Hello world!</h1>
        <Button>Click me!</Button>
    </>
)
    */