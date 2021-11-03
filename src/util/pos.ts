
export type Pos = { x: number, y: number };

export function eqPos(p1: Pos, p2: Pos) {
    return p1.x === p2.x && p1.y === p2.y
}