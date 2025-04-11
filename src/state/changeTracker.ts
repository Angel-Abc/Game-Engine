import { ChangeInfo, IChangeTracker, IChangeTrackerDebugger, Primitive, SaveData, TurnChanges } from 'Types/state'

export class ChangeTracker implements IChangeTracker, IChangeTrackerDebugger {
    changes: TurnChanges[] = []
    activeTurnIndex = -1
    consolidatedChanges: Map<string, Primitive> = new Map<string, Primitive>()
    maxNumberOfTurnsToTrack: number

    constructor(maxNumberOfTurnsToTrack: number = 10) {
        this.maxNumberOfTurnsToTrack = maxNumberOfTurnsToTrack
        this.startNewTurn()
    }

    trackChange(changeInfo: ChangeInfo): void {
        this.changes[this.activeTurnIndex].changes.push(changeInfo)
    }

    startNewTurn(): void {
        this.activeTurnIndex++
        this.changes[this.activeTurnIndex] = { changes: [] }
        if (this.changes.length > this.maxNumberOfTurnsToTrack) {
            this.addToConsolidatedChanges(this.changes.shift() as TurnChanges)
            this.activeTurnIndex--
        }
    }

    undo(dataSet: any): void {
        if (this.activeTurnIndex >= 0) {
            this.rollbackChanges(dataSet, this.changes[this.activeTurnIndex].changes)
            this.activeTurnIndex--
        }
    }

    private rollbackChanges(dataSet: any, changes: ChangeInfo[]) {
        for (const change of changes) {
            const pathParts = change.path.split('.')
            let currentObject: any = dataSet
            for (let i = 0; i < pathParts.length - 1; i++) {
                currentObject = currentObject[pathParts[i]]
            }
            const lastPart = pathParts[pathParts.length - 1]
            currentObject[lastPart] = change.oldValue
        }
    }

    public save(): SaveData {
        return {
            turns: this.changes,
            activeTurnIndex: this.activeTurnIndex,
            consolidatedChanges: Object.fromEntries(this.consolidatedChanges)
        }
    }

    public load(initialData: any, saveData: SaveData): void {
        this.changes = saveData.turns
        this.activeTurnIndex = saveData.activeTurnIndex
        this.consolidatedChanges = new Map<string, Primitive>(Object.entries(saveData.consolidatedChanges))

        this.applyConsolidatedChanges(initialData, this.consolidatedChanges)
        for (let i = 0; i <= this.activeTurnIndex; i++) {
            this.applyChanges(initialData, this.changes[i].changes)
        }
    }

    private applyChanges(dataSet: any, changes: ChangeInfo[]) {
        for (const change of changes) {
            const pathParts = change.path.split('.')
            let currentObject: any = dataSet
            for (let i = 0; i < pathParts.length - 1; i++) {
                currentObject = currentObject[pathParts[i]]
            }
            const lastPart = pathParts[pathParts.length - 1]
            currentObject[lastPart] = change.newValue
        }
    }

    private applyConsolidatedChanges(dataSet: any, consolidatedChanges: Map<string, Primitive>): void {
        for (const [path, value] of consolidatedChanges) {
            const pathParts = path.split('.')
            let currentObject: any = dataSet
            for (let i = 0; i < pathParts.length - 1; i++) {
                currentObject = currentObject[pathParts[i]]
            }
            const lastPart = pathParts[pathParts.length - 1]
            currentObject[lastPart] = value
        }
    }

    private addToConsolidatedChanges(turnChanges: TurnChanges): void {
        for (const change of turnChanges.changes) {
            this.consolidatedChanges.set(change.path, change.newValue)
        }
    }
}