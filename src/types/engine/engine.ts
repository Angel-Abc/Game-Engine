import { State } from 'Game/engine/state'

export interface IEngine {
    start(): void
    get engineState(): State
}