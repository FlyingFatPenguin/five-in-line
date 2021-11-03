import { eqPos, Pos } from "../util/pos";
import Block from "./block/Block";
import Matrix from "./matrix";


interface Props {
    data: number[][]
    activePos?: Pos;
    onClick?: (p: Pos) => void
}

const Board: React.FC<Props> = props => {
    const { data, onClick, activePos } = props;
    return <>
        <Matrix sizeX={9} sizeY={9} onClick={onClick}>
            {p => {
                const { x, y } = p
                const type = data[y]?.[x]
                const active = activePos ? eqPos(p, activePos) : false;
                return <Block type={type} active={active} />
            }}
        </Matrix>
    </>;
}

export default Board