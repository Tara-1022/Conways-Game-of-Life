const Cell = class {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

const offsets = [(-1,0), (1,0), (0,1), (0,-1), (-1, -1), (1, 1), (-1, 1), (1, -1)]