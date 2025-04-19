import { EngineSubscriber, IEngine } from 'Types/engine/engine'
import { IResourceProvider } from 'Types/utils'
import { State } from './state'
import { IStartScreenInfoLoader, StartScreenInfo } from 'Types/loader/startScreenInfo'
import { StartScreenInfoLoader } from 'Game/loader/startScreenInfoLoader'
import { GameInfo } from 'Types/gameInfo'
import { fatalError, logInfo } from 'Utils/logMessage'

let gameEngine: IEngine | null = null
export function getGameEngine(): IEngine {
    if (gameEngine === null) {
        fatalError('Game engine is not initialized')
    }  
    return gameEngine
}

export class Engine implements IEngine {
    private _state: State
    private startScreenInfo: StartScreenInfo | null = null
    private subscribers: Set<EngineSubscriber> = new Set()

    constructor(private resourceProvider: IResourceProvider, private gameInfo: GameInfo) {
        this._state = State.init
        gameEngine = this
    }

    private notifySubscribers() {
        this.subscribers.forEach(callback => callback())
    }

    subscribe(callback: EngineSubscriber): () => void {
        this.subscribers.add(callback)
        return () => this.subscribers.delete(callback)
    }

    public get engineState(): State {
        return this.state
    }

    private get state(): State {
        return this._state
    }

    private set state(value: State) {
        if (this._state !== value) {
            this._state = value
            logInfo('Engine state changed: {0}', this._state)
            this.notifySubscribers()
        }
    }

    public async start(): Promise<void> {
        this.state = State.loadingStart
        const startScreenInfoLoader: IStartScreenInfoLoader = new StartScreenInfoLoader(this.gameInfo.startScreenFile, this.resourceProvider)
        this.startScreenInfo = await startScreenInfoLoader.load()
        logInfo('Start screen info loaded: {0}', this.startScreenInfo)
        this.state = State.start
    }

}