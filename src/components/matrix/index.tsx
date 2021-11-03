import { range } from 'lodash'
import './index.css';

const style: React.CSSProperties = {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
}

interface Props {
    sizeX: number;
    sizeY: number;
    children?: (p: { x: number, y: number }) => JSX.Element;
    onClick?: (p: { x: number, y: number }) => void
}

const Matrix: React.FC<Props> = props => {
    const { sizeX, sizeY, children: Children, onClick } = props;

    return <div className='matrix' style={style}>
        {range(sizeY).map(y =>
            <div className='matrix-row' key={y}>
                {
                    range(sizeX).map(x =>
                        <div className='matrix-block' key={x} onClick={() => onClick?.({ x, y })}>
                            {typeof Children === 'function'
                                ? <Children x={x} y={y} />
                                : Children}
                        </div>
                    )
                }
            </div>
        )}
    </div>;
}

export default Matrix