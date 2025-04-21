import { IChangeTracker, IStateManager, Primitive, SaveData } from 'src/types/state'
import { fatalError } from 'Utils/logMessage'

export class StateManager<TData extends object> implements IStateManager<TData> {
    private proxyObjectCache = new WeakMap<object, any>()
    private stateProxy: TData
    private underlyingData: TData

    constructor(private initialData: TData, private changeTracker: IChangeTracker) {
        this.underlyingData = { ...initialData }
        this.stateProxy = this.createStateProxy(this.underlyingData)
    }

    get state (): TData {
        return this.stateProxy
    }

    public commitTurn(): void {
        this.changeTracker.startNewTurn()
    }

    public rollbackTurn(): void {
        this.changeTracker.undo(this.underlyingData)
    }

    public save(): string {
        const saveData = this.changeTracker.save()
        const result = JSON.stringify(saveData)
        return result
    }

    public load(saveString: string): void {
        const saveData: SaveData = JSON.parse(saveString)
        this.changeTracker.load(this.initialData, saveData)
    }

    private createStateProxy<TData extends object>(target: TData, path: string | null = null): TData {
        // none object types don't need a proxy
        if (target === null || typeof target !== 'object') {
            return target
        }
    
        // already cached? return the cached version
        if (this.proxyObjectCache.has(target)) {
            return this.proxyObjectCache.get(target)
        }
    
        const self = this

        // create the result proxy
        const proxy = new Proxy(target, {
            get(target: TData, prop: string | symbol, receiver: any) {
                let value = Reflect.get(target, prop, receiver)
    
                const currentPath = path ? `${path}.${String(prop)}` : String(prop)
    
                if (value !== null && typeof value === 'function') {
                    fatalError(`State proxy cannot contain functions. Please use a different approach for ${currentPath}`)
                } else if (value !== null && typeof value === 'object') {
                    // create a proxy for the object
                    value = self.createStateProxy(value, currentPath)
                }
    
                return value
            },
            set(target: TData, prop: string | symbol, value: any, receiver: any) {
                const currentPath = path ? `${path}.${String(prop)}` : String(prop)
    
                // if the value is an object, create a proxy for it
                if (value !== null && typeof value === 'object') {
                    value = self.createStateProxy(value, currentPath)
                    const result = Reflect.set(target, prop, value, receiver)
                    return result
                }
                const oldValue = Reflect.get(target, prop, receiver)
                const result = Reflect.set(target, prop, value, receiver)
                if (oldValue === null || oldValue === undefined|| typeof oldValue === 'string' || typeof oldValue === 'number' || typeof oldValue === 'boolean') {
                    self.changeTracker.trackChange({path: currentPath, newValue: value, oldValue:(oldValue ?? null) as Primitive})
                }
                return result
            }
    
        })
        
        this.proxyObjectCache.set(target, proxy)
        return proxy
    }
}