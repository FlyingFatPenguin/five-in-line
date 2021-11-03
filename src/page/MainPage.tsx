import { range } from "lodash";
import Board from "../components/Board";
import { randomInt } from "../util/math";

interface Props {
}

const MainPage: React.FC<Props> = props => {
    console.log(range(9))
    const data = range(9)
        .map(() => range(9)
            .map(() => randomInt(8)))
    return <Board data={data} />;
}

export default MainPage;