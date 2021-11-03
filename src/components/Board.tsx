import Block from "./block/Block";
import Matrix from "./matrix";

interface Props {
    data: number[][]
    onClick?: (p: { x: number, y: number }) => void
}

const Board: React.FC<Props> = props => {
    const { data, onClick } = props;
    return <>
        <Matrix sizeX={9} sizeY={9} onClick={onClick}>
            {({ x, y }) => {
                const type = data[y]?.[x]
                return <Block type={type} />
            }}
        </Matrix>
    </>;
}

export default Board