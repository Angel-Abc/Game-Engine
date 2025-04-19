import { State } from 'Game/engine/state'
import { IEngine } from 'Types/engine/engine'
import { StartScreen } from './startScreen'
import { logDebug } from 'Utils/logMessage'
import { getGameEngine } from 'Game/engine/engine'
import { useSyncExternalStore } from 'react'

interface AppProps {
}

export const App: React.FC<AppProps> = (): React.JSX.Element => {
    const engine: IEngine = getGameEngine()
    
    const engineState = useSyncExternalStore(
        engine.subscribe.bind(engine),
        () => engine.engineState
    )
    logDebug('Engine state: {0}', engineState)
    switch (engineState) {
        case State.init:{
            return (
                <div>init ...</div>
            )
        }
        case State.loadingStart:{
            return (
                <div>loading start screen ...</div>
            )
        }
        case State.start:{
            return (
                <StartScreen engine={engine} />
            )
        }
        default: {
            return (
                <div>TODO</div>
            )
        }
    }
}