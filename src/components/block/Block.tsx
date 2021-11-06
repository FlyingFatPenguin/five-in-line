import './Block.css';

// 序号从 1 开始
const ICON_MAPPING = [
    '🐒', //1
    '🐧',
    '🐶',
    '🦄',
    '🐘',
    '🐨',
    '🐇',
    '🦘',
    '🐼',
    '🐦',
]

interface Props {
    type?: number;
    active?: boolean;
}

const Block: React.FC<Props> = props => {
    const { type, active } = props;
    if (!type) {
        return <></>;
    }
    const icon = ICON_MAPPING[type - 1];
    return <span className={active ? 'active' : ''}>{icon}</span>;
}

export default Block