
const ICON_MAPPING = [
    '🐒',
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
    if (type === undefined) {
        return <></>;
    }
    const icon = ICON_MAPPING[type];
    return <>{icon}</>;
}

export default Block