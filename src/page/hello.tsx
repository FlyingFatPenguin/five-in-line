import Matrix from "../components/matrix";

interface Props {

}

const MainPage: React.FC<Props> = props => {
    return <>
        <Matrix sizeX={10} sizeY={10}></Matrix>
    </>;
}

export default MainPage;