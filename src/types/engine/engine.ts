import { State } from 'Game/engine/state'

export type EngineSubscriber = () => void

export interface IEngine {
    start(): void
    get engineState(): State
    subscribe(callback: EngineSubscriber): () => void
}