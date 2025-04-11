import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from '@/components/ui/button'
import { logInfo } from 'Utils/logMessage'
import { ChangeTracker } from './state/changeTracker'
import { StateManager } from './state/stateManager'
import { IChangeTracker, IStateManager } from 'Types/state'

const changeTracker: IChangeTracker = new ChangeTracker()
const initialData = {
    test: {
        nested: 'a'
    }
}
const stateManager: IStateManager<typeof initialData> = new StateManager(initialData, changeTracker)

const state = stateManager.state
state.test.nested = 'b'
stateManager.commitTurn()
state.test.nested = 'c'

const saveData = stateManager.save()
logInfo('Save data: {0}', saveData)

stateManager.rollbackTurn()
stateManager.rollbackTurn()
logInfo('After rollback: {0}', state.test.nested)

stateManager.load(saveData)
logInfo('After load: {0}', state.test.nested)

document.body.innerHTML = '<div id="app"></div>'
const root = createRoot(document.getElementById('app')!)


root.render(
    <>
        <h1>Hello world!</h1>
        <Button>Click me!</Button>
    </>
)