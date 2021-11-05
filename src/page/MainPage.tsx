import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import { GameBoard } from '../game';
import { randomInt } from "../util/math";
import { eqPos, Pos } from "../util/pos";

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
    const [level] = useState(5);
    const [game] = useState(() => new GameBoard())
    const [activePos, setActivePos] = useState<Pos>()

    const newBlock = useCallback(() => {
        return randomInt(level - 1) + 1
    }, [level])

    useEffect(() => {
        game.randomPickEmpty(5)?.forEach(p => game.add(p, newBlock()))
        update()
    }, [game, newBlock, update])

    const move = useCallback((f: Pos, t: Pos) => {
        game.move(f, t);
        game.randomPickEmpty(3)?.forEach(p => game.add(p, newBlock()))
        update()
    }, [game, newBlock, update])

    const handleClick = useCallback((p: Pos) => {
        if (activePos) {
            if (game.canMove(activePos, p)) {
                move(activePos, p)
            }
            setActivePos(undefined)
            return;
        }
        setActivePos(p)
    }, [activePos, game, move])

    return <div style={style}>
        <Board data={game.clone()} onClick={handleClick} activePos={activePos} />
    </div>;
}

export default MainPage;