import { evolve } from "./game_logic.js";
import { alive_color, dead_color, board_render_size } from "./constants.js";
// row id -> row_<ind>
// cell id -> cell_<row>.<col>

var alive_cells = new Set();
var drag_state_on = false;
var edit_allowed = true;

function generateBoard(n) {
    let row;
    let col;
    let cell_id;
    for (row = 0; row < n; row += 1) {
        jQuery("#board").append("<div id='row_" + row + "' class='row'></div>")
    }
    for (row = 0; row < n; row += 1) {
        for (col = 0; col < n; col += 1) {
            cell_id = row + "." + col
            jQuery("#row_" + row).append(
                "<div id='cell_" + cell_id +
                "' class='cell' style='background-color:" +
                dead_color +
                ";'>" +
                "</div>")
        }
    }
}

export function to_cell_id(cell) {
    return "cell_" + cell[0] + "." + cell[1]
}

export function to_cell(cell_id) {
    return cell_id.slice(5).split(".").map((n) => parseInt(n))
}

function is_renderable_cell(cell_id){
    let cell = to_cell(cell_id)
    return (cell[0] < board_render_size) && (cell[1] < board_render_size)
}

function set_cells(cells, color) {
    let cell_element;
    for (let cell_id of cells) {
        if (!is_renderable_cell(cell_id)) {
            continue;
        }
        cell_element = document.getElementById(cell_id)
        cell_element.style.backgroundColor = color
    }
}

function set_cell(cell_id, color) {
    if (!is_renderable_cell(cell_id)) {
        return;
    }
    let cell_element = document.getElementById(cell_id)
    cell_element.style.backgroundColor = color
}

function toggle_cell(cell_id) {
    if (!is_renderable_cell(cell_id)) {
        return;
    }
    let cell_element = document.getElementById(cell_id)
    cell_element.style.backgroundColor = (cell_element.style.backgroundColor == alive_color) ? dead_color : alive_color
}

function nextState() {
    let cell;
    let now_alive_cells = evolve(alive_cells)
    set_cells(alive_cells, dead_color)
    set_cells(now_alive_cells, alive_color)
    alive_cells = now_alive_cells
}


jQuery(window).on('load', function () {
    generateBoard(board_render_size);

    jQuery(".cell").click(function () {
        if (edit_allowed) {
            let cell_id = jQuery(this).attr("id")
            alive_cells.has(cell_id)? alive_cells.delete(cell_id) : alive_cells.add(cell_id)
            toggle_cell(jQuery(this).attr("id"))
        }
    })

    jQuery("#board").mousedown(function () {
        drag_state_on = true
    })

    jQuery("#board").mouseup(function () {
        drag_state_on = false
    })

    jQuery(".cell").mouseenter(function () {
        if (edit_allowed && drag_state_on) {
            let cell_id = jQuery(this).attr("id")
            alive_cells.has(cell_id)? alive_cells.delete(cell_id) : alive_cells.add(cell_id)
            toggle_cell(jQuery(this).attr("id"))
        }
    })

    jQuery("#evolve").click(function () {
        nextState()
    })

})