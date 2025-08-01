import type { Button } from './button'

export interface GameMenuComponent {
    type: 'game-menu'
    buttons: Button[]
}

export interface ImageComponent {
    type: 'image'
    image: string
}

interface MapSize {
    rows: number
    columns: number
}

export interface SquaresMapComponent {
    type: 'squares-map',
    mapSize: MapSize
}

export type Component =
    GameMenuComponent |
    ImageComponent |
    SquaresMapComponent

