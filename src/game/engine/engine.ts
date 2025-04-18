import { IEngine } from 'Types/engine/engine'
import { IResourceProvider } from 'Types/utils'
import { State } from './state'
import { IStartScreenInfoLoader } from 'Types/loader/startScreenInfo'
import { StartScreenInfoLoader } from 'Game/loader/startScreenInfoLoader'
import { GameInfo } from 'Types/gameInfo'

export class Engine implements IEngine {
    private state: State
    constructor(private resourceProvider: IResourceProvider, private gameInfo: GameInfo) {
        this.state = State.init
    }

    public get engineState(): State {
        return this.state
    }

    public async start(): Promise<void> {
        this.state = State.loadingStart
        const startScreenInfoLoader: IStartScreenInfoLoader = new StartScreenInfoLoader(this.gameInfo.startScreenFile, this.resourceProvider)

    }
}