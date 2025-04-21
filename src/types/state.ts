export type Primitive = string | number | boolean | null

export type ChangeInfo = {
    path: string,
    oldValue: Primitive,
    newValue: Primitive
}

export type TurnChanges = {
    changes: ChangeInfo[]
}

export interface SaveData {
    turns: TurnChanges[]
    activeTurnIndex: number
    consolidatedChanges: { [key: string]: Primitive }
}

export interface IChangeTracker {
    trackChange(changeInfo: ChangeInfo): void
    startNewTurn(): void
    undo(dataSet: any): void
    save(): SaveData
    load(initialData: any, saveData: SaveData): void
}

export interface IChangeTrackerDebugger {
    changes: TurnChanges[]
    activeTurnIndex: number
    consolidatedChanges: Map<string, Primitive>
}

export interface IStateManager<TData extends object> {
    rollbackTurn(): void
    commitTurn(): void
    save(): string 
    load(saveString: string): void   
    get state(): TData
}

