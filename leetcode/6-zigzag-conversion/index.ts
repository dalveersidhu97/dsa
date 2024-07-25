
export const convert = (s: string, numRows: number) => {
    if (numRows === 1)
        return s;
    let str = '';
    outer:
    for (let r = 0; r < numRows; r++) {
        let c = 0;
        while (true) {
            const step = numRows - 1;
            const remainder = c % step;
            const numVerticals = Math.ceil(c / step);
            const rMultiplier = remainder === 0 ? 1 : -1;
            const numVerticalCells = numVerticals * numRows;
            const numDiagonalCells = numVerticals * (numRows - 2);
            const index = numVerticalCells + numDiagonalCells + r * rMultiplier;
            if (index >= s.length) break;
            str += s[index];
            if (str.length === s.length)
                break outer;
            const lastCell = c - remainder;
            const nextVerticalCell = lastCell + step;
            const nextDiagonalCell = nextVerticalCell - r;
            c = c === nextDiagonalCell ? nextVerticalCell : Math.min(nextDiagonalCell, nextVerticalCell);
        }
    }
    return str;
};