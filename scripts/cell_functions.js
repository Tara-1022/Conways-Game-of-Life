import { alive_color, dead_color, board_render_size } from "./constants.js"

function to_cell_id(cell) {
    return "cell_" + cell[0] + "." + cell[1]
}

function to_cell(cell_id) {
    return cell_id.slice(5).split(".").map((n) => parseInt(n))
}

function is_renderable_cell(cell_id) {
    let cell = to_cell(cell_id)
    return (0 <= cell[0]) &&  (cell[0] < board_render_size) && (0 <= cell[1]) && (cell[1] < board_render_size)
}

function set_cells(cells, color) {
    let cell_element;
    for (let cell_id of cells) {
        if (is_renderable_cell(cell_id)) {
            cell_element = document.getElementById(cell_id)
            cell_element.style.backgroundColor = color
        }
    }
}

function set_cell(cell_id, color) {
    if (is_renderable_cell(cell_id)) {
        let cell_element = document.getElementById(cell_id)
        cell_element.style.backgroundColor = color
    }
}

function toggle_cell(cell_id) {
    if (is_renderable_cell(cell_id)) {
        let cell_element = document.getElementById(cell_id)
        cell_element.style.backgroundColor = (cell_element.style.backgroundColor == alive_color) ? dead_color : alive_color
    }
}

export {to_cell_id, to_cell, is_renderable_cell, set_cells, set_cell, toggle_cell}