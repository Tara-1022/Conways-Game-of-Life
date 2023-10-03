import {alive_color, board_render_size, offsets} from './constants.js'
import {to_cell_id, to_cell} from './board_functions.js'

const board_size = board_render_size + 3;

function will_live(cell_id, now_alive){
    let alive_neighbours = 0;
    let neighbour;
    let cell= to_cell(cell_id)
    for(let offset of offsets){
        neighbour = [cell[0]+ offset[0], cell[1] + offset[1]]
        if(now_alive.has(to_cell_id(neighbour))){
            alive_neighbours += 1
        }
    }
    if(now_alive.has(cell_id)){
        return alive_neighbours == 2 || alive_neighbours == 3
    }
    else{
        return alive_neighbours == 3
    }
}

export function evolve(now_alive){
    let next_alive = new Set()
    for(let row=0; row < board_size; row+=1){
        for(let col=0; col < board_size; col+=1){
            if(will_live(to_cell_id([row, col]), now_alive)){
                next_alive.add(to_cell_id([row, col]))
            }
        }
    }
    return next_alive
}