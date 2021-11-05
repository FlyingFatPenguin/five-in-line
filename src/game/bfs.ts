import _, { isEqual, range } from 'lodash'

const cache = <R>(f: (v: number) => R) => {
    const store: Record<number, R> = {};
    return (v: number) => {
        if (v in store) {
            return store[v]
        }
        return store[v] = f(v)
    }
}

const unique = <T>(arr: T[]): T[] => {
    return _.uniqWith(arr, _.isEqual)
}

export const bfs = <T>(start: T[], mapping: (v: T) => T[]) => {
    const rank = cache((t: number): T[] =>
        t === 0 ?
            start :
            unique([...rank(t - 1).map(mapping).reduce((a, b) => [...a, ...b], []), ...rank(t - 1)]))
    return rank
}

export const findWay = <T>(start: T, target: T, mapping: (v: T) => T[]): T[] | undefined => {
    const search = bfs([start], mapping)

    let times = 1;
    // 判断是否可解
    while (true) {
        if (search(times).length === search(times - 1).length) {
            return;
        }
        if (search(times).some(p => isEqual(p, target))) {
            break;
        }
        times++
    }
    // 查看第 dist 步在哪里
    const step = cache((dist: number): T => {
        if (dist === times) {
            return target
        }
        const nextStep = step(dist + 1)
        return search(dist).reverse().find(v => mapping(v).some(x => isEqual(x, nextStep)))!
    })
    return range(times + 1).map(step)
}