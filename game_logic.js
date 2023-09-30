import {board_render_size} from 'constants.json'

const offsets = [[-1,0], [1,0], [0,1], [0,-1], [-1, -1], [1, 1], [-1, 1], [1, -1]]
const board_size = board_render_size + 3;

function will_live(cell){
    let alive_neighbours = 0;
    let neighbour;
    for(offset of offsets){
        neighbour = [cell[0]+ offset[0], cell[1] + offset[1]]
        if(alive_cells.has(neighbour)){
            alive_neighbours += 1
        }
    }
    return alive_neighbours == 3
}

function evolve(){
    let next_alive = new Set()
    for(let row=0; row < board_size; row+=1){
        for(let col=0; col < board_size; col+=1){
            if(will_live([row, col])){
                next_alive.add([row, col])
            }
        }
    }
    return next_alive
}