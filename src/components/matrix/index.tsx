import { range } from 'lodash'
import './index.css';

interface Props {
    sizeX: number;
    sizeY: number;
}

const Matrix: React.FC<Props> = props => {
    const { sizeX, sizeY } = props;
    const style: React.CSSProperties = {
        width: '100vh',
        height: '100vh',
    }
    return <div className='matrix' style={style}>
        {range(sizeY).map(y =>
            <div className='matrix-row'>
                {
                    range(sizeX).map(x =>
                        <div className='matrix-block'>{x}-{y}</div>
                    )
                }
            </div>
        )}
    </div>;
}

export default Matrix