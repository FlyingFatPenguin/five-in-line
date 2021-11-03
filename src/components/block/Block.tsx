
// 序号从 1 开始
const ICON_MAPPING = [
    '🐒', //1
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
}

const Block: React.FC<Props> = props => {
    const { type } = props;
    if (!type) {
        return <></>;
    }
    const icon = ICON_MAPPING[type - 1];
    return <>{icon}</>;
}

export default Block