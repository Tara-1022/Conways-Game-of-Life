const dead_color = "black";
const alive_color = "yellow";
const board_render_size = 50;
const offsets = [[-1,0], [1,0], [0,1], [0,-1], [-1, -1], [1, 1], [-1, 1], [1, -1]];

// some invisible rows and columns on each end to give the impression of an infinite board
const overflow_amt = 3;

export {dead_color, alive_color, board_render_size, overflow_amt, offsets}