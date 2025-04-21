export interface GameInfo {
    title: string
    startScreenFile: string
    gameDataFile: string
}

export interface IGameInfoLoader {
    load(): Promise<GameInfo>
}

export interface IGameInfoBuilder {
    
}