import { IEngine } from 'Types/engine/engine'

interface StartScreenProps {
    engine: IEngine
}

export const StartScreen: React.FC<StartScreenProps> = ({ engine }): React.JSX.Element => {
    return (
        <div>Start screen</div>
    )
}