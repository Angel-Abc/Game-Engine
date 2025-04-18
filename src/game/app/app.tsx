import { State } from 'Game/engine/state'
import React from 'react'
import { IEngine } from 'Types/engine/engine'

interface AppProps {
    engine: IEngine
}

export const App: React.FC<AppProps> = ({ engine }): React.JSX.Element => {
    switch (engine.engineState) {
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
        default: {
            return (
                <div>TODO</div>
            )
        }
    }
}