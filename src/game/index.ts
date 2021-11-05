import _, { cloneDeep, range } from "lodash"
import { findWay } from './bfs'

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

// 获取表格中全部的行列斜线
type Line = Pos[]
const allLines = (()=> {
    const cols: Line[] = range(9).map(x => range(9).map(y => ({ x, y })))
    const rows: Line[] = range(9).map(y => range(9).map(x => ({ x, y })))
    const nw: Line[] = range(9).map(x => range(9)
        .map(y => ({ x: y, y: x + y - 4 }))
        .filter(({ y }) => y >= 0 && y < 9))
    const ne: Line[] = range(9).map(x => range(9)
        .map(y => ({ x: y, y: x - y + 4 }))
        .filter(({ y }) => y >= 0 && y < 9))
    // TODO: 斜线以后在说
    console.log(ne)
    return [...cols, ...rows, ...nw, ...ne]
})()

export class GameBoard {
    private data: BoardData;
    constructor() {
        this.data = emptyBoard();
    }
    private get(pos: Pos) {
        const { x, y } = pos;
        return (this.data[y] || [])[x];
    }
    private set(pos: Pos, val: number) {
        const { x, y } = pos;
        this.data[y][x] = val
    }
    private remove(pos: Pos) {
        this.set(pos, 0)
    }
    clone() {
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
        this.forceMove(from, target)
        this.clearInLine()
    }
    canMove(from: Pos, target: Pos) {
        return this.get(from) && !this.get(target) && this.findWay(from, target);
    }
    private nearBy = (p: Pos) => {
        const { x, y } = p
        return [
            { x: x + 1, y: y },
            { x: x - 1, y: y },
            { x: x, y: y + 1 },
            { x: x, y: y - 1 },
        ]
    }
    private nearByCanGo = (p: Pos) => {
        return this.nearBy(p).filter(v => this.get(v) === 0)
    }
    findWay(from: Pos, target: Pos) {
        return findWay(from, target, v => [v, ...this.nearByCanGo(v)]);
    }


    // 返回序列中连续五个以上的节点
    private getFiveInLine(posList: Pos[]): Pos[] {
        if (posList.length < 5) {
            return []
        }
        const [x, ...xs] = posList;
        const res: Pos[] = [x]
        for (const p of xs) {
            const last = res[res.length - 1]
            if (this.get(last) !== this.get(p)) {
                if (res.length >= 5) {
                    return res;
                }
                res.length = 0
            }
            res.push(p)
        }

        if (res.length >= 5) {
            return res;
        }
        return [];
    }
    // 消去
    clearInLine() {
        const allPoses = _(allLines).flatMap(line => this.getFiveInLine(line)).uniq().value()
        allPoses.forEach(p => this.remove(p))
    }
}


// function main() {
//     const game = new GameBoard()
//     // const posList = game.randomPickEmpty(60)
//     // posList?.forEach(p => game.add(p, 2))
//     // console.log(game.getFiveInLine(range(9).map(y => ({ x: 0, y }))))
//     // console.log(game.show())
//     console.log(game.findWay({ x: 1, y: 1 }, { x: 3, y: 4 }))
// }

// main()