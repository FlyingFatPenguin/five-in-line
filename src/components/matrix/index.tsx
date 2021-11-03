import { range } from 'lodash'
import './index.css';

interface Props {
    sizeX: number;
    sizeY: number;
    children?: (p: { x: number, y: number }) => JSX.Element;
}

const Matrix: React.FC<Props> = props => {
    const { sizeX, sizeY, children: Children } = props;
    const style: React.CSSProperties = {
        width: '100vh',
        height: '100vh',
    }
    return <div className='matrix' style={style}>
        {range(sizeY).map(y =>
            <div className='matrix-row'>
                {
                    range(sizeX).map(x =>
                        <div className='matrix-block'>
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