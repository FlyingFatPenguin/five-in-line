import { useBoolean } from "@huse/boolean";
import { useCallback, useEffect, useState } from "react";
import Board from "../components/Board";
import { GameBoard } from '../game';
import { randomInt } from "../util/math";
import { Pos } from "../util/pos";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const style: React.CSSProperties = {
    height: '100vh',
    width: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0
}

const useUpdate = () => {
    const [, setS] = useState(0)
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
    const [score, setScore] = useState(0);

    const newBlock = useCallback(() => {
        return randomInt(level - 1) + 1
    }, [level])

    useEffect(() => {
        game.randomPickEmpty(5)?.forEach(p => game.add(p, newBlock()))
        update()
    }, [game, newBlock, update])

    const [isMoving, { on, off }] = useBoolean(false);

    const move = useCallback(async (f: Pos, t: Pos) => {
        const way = game.findWay(f, t);
        if (!way) {
            return
        }
        on()
        let last = f;
        for (const p of way) {
            await sleep(50);
            game.move(last, p);
            last = p
            update()
        }
        const clearNum = game.clearInLine()
        game.randomPickEmpty(3)?.forEach(p => game.add(p, newBlock()))
        console.log(clearNum)
        setScore(v => v + clearNum)
        update()
        off()
    }, [game, newBlock, off, on, update])

    const handleClick = useCallback((p: Pos) => {
        if (isMoving) {
            return
        }
        if (activePos) {
            if (game.canMove(activePos, p)) {
                move(activePos, p)
            }
            setActivePos(undefined)
            return;
        }
        setActivePos(p)
    }, [activePos, game, isMoving, move])

    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <h1>当前分数{score}</h1>
        </div>
        <div style={style}>
            <Board data={game.clone()} onClick={handleClick} activePos={activePos} />
        </div>
    </div>;
}

export default MainPage;