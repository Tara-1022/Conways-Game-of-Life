// import {board_render_size, alive_color, dead_color} from 'constants.json'
const board_render_size = 50;
const alive_color = "yellow";
const dead_color = "black";
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
                // cell_id +
                "</div>")
        }
    }
}

function to_cell_id(cell) {
    return "cell_" + cell[0] + "." + cell[1]
}

function to_cell(cell_id) {
    return cell_id.slice(4).split(".").map(parseInt)
}

function set_cells(cells, color) {
    let cell_element;
    for (cell_id of cells) {
        cell_element = document.getElementById(cell_id)
        cell_element.style.backgroundColor = color
    }
}

function set_cell(cell_id, color) {
    let cell_element = document.getElementById(cell_id)
    cell_element.style.backgroundColor = color
}

function toggle_cell(cell_id) {
    let cell_element = document.getElementById(cell_id)
    cell_element.style.backgroundColor = (cell_element.style.backgroundColor == alive_color) ? dead_color : alive_color
}


jQuery(window).on('load', function () {
    generateBoard(board_render_size);

    jQuery(".cell").click(function () {
        if (edit_allowed) {
            alive_cells.add(to_cell(jQuery(this).attr("id")))
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
            alive_cells.add(to_cell(jQuery(this).attr("id")))
            toggle_cell(jQuery(this).attr("id"))
        }
    })

})