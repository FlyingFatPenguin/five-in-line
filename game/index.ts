import { cloneDeep, range } from "lodash"

////////////util
function randomInt(upper: number) {
    return Math.floor(Math.random() * upper)
}

function randomPick<T>(arr: T[], num = 1): T[] | undefined {
    const len = arr.length;
    if (len < num) {
        return undefined;
    }

    const res: T[] = []
    let tmpArr = [...arr];
    for (let i = 0; i < num; i++) {
        const index = randomInt(tmpArr.length)
        const v = tmpArr.splice(index, 1)
        res.push(...v)
    }

    return res;
}

////////////
type BoardData = number[][]
type Pos = { x: number, y: number }

function emptyBoard() {
    return range(9).map(() => range(9).fill(0))
}

function allEmptyPoses(board: BoardData) {
    const res: Pos[] = []
    for (const y in board) {
        const row = board[y]
        for (const x in row) {
            const v = row[x]
            if (v === 0) {
                res.push({ x: +x, y: +y })
            }
        }
    }
    return res;
}

function randomPickEmpty(board: BoardData, num = 1) {
    const emptyPosList = allEmptyPoses(board);
    return randomPick(emptyPosList, num)
}

export class GameBoard {
    private data: BoardData;
    constructor() {
        this.data = emptyBoard();
    }
    private get(pos: Pos) {
        const { x, y } = pos;
        return this.data[y][x];
    }
    private set(pos: Pos, val: number) {
        const { x, y } = pos;
        this.data[y][x] = val
    }
    clone(){
        return cloneDeep(this.data);
    }

    // 增删
    randomPickEmpty(num = 1) {
        return randomPickEmpty(this.data, num)
    }
    add(pos: Pos, val: number) {
        if (this.get(pos) === 0) {
            this.set(pos, val)
            return true;
        }
        return false;
    }
    show(): string {
        return this.data.map(row => row.join(',')).join('\n')
    }

    // 移动
    private forceMove(from: Pos, target: Pos) {
        const v = this.get(from);
        this.set(from, 0)
        this.set(target, v)
    }
    move(from: Pos, target: Pos) {

    }
}


function main() {
    const game = new GameBoard()
    const posList = game.randomPickEmpty(3)
    posList?.forEach(p => game.add(p, 2))
    console.log(game.show())
}

main()