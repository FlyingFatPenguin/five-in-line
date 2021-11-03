import Block from "./block/Block";
import Matrix from "./matrix";

interface Props {
    data: number[][]
}

const Board: React.FC<Props> = props => {
    const { data } = props;
    return <>
        <Matrix sizeX={9} sizeY={9}>
            {({ x, y }) => {
                const type = data[y]?.[x]
                return <Block type={type} />
            }}
        </Matrix>
    </>;
}

export default Board