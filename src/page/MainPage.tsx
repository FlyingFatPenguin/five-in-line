import { useState } from "react";
import Board from "../components/Board";
import { GameBoard } from '../game';

interface Props {
}

const MainPage: React.FC<Props> = props => {
    const [game] = useState(() => new GameBoard())
    game.randomPickEmpty(5)?.forEach(p => game.add(p, 2))


    return <Board data={game.clone()} />;
}

export default MainPage;