import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import { GameBoard } from '../game';

const style: React.CSSProperties = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const useUpdate = () => {
    const [_s, setS] = useState(0)
    const f = useCallback(() => setS(v => v + 1), [])
    return f;
}

interface Props {
}

const MainPage: React.FC<Props> = props => {
    const update = useUpdate()
    const [game] = useState(() => new GameBoard())

    useEffect(() => {
        game.randomPickEmpty(5)?.forEach(p => game.add(p, 2))
        update()
    }, [game, update])

    return <div style={style}>
        <Board data={game.clone()} />
    </div>;
}

export default MainPage;