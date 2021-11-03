import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import { GameBoard } from '../game';
import { Pos } from "../util/pos";

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
    const [pos, setPos] = useState<Pos>()

    useEffect(() => {
        game.randomPickEmpty(5)?.forEach(p => game.add(p, 2))
        update()
    }, [game, update])

    const handleClick = useCallback((p: Pos) => {
        if (pos) {
            setPos(undefined)
            game.move(pos, p);
            update()
            return;
        }
        setPos(p)
    }, [pos])

    return <div style={style}>
        <Board data={game.clone()} onClick={handleClick} activePos={pos} />
    </div>;
}

export default MainPage;