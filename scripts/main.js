import { evolve } from "./conway_functions.js";
import { alive_color, dead_color, board_render_size } from "./constants.js";
import { to_cell_id, to_cell, is_renderable_cell, set_cells, set_cell, toggle_cell } from './cell_functions.js'
import { serialize_set, deserialize_set, load_state, load_state_names } from "./import_export.js";
// row id -> row_<ind>
// cell id -> cell_<row>.<col>

var alive_cells = new Set();
var animate_timer;
var drag_state_on = false;
var edit_allowed = true;
var is_animating = false;

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

function load_options() {
    let state_names = load_state_names()
    Object.keys(state_names).forEach(name => {
        jQuery('#choose_state').append("<option value='" + name + "'>" + state_names[name] + "</option>")
    });
}

function nextState() {
    let now_alive_cells = evolve(alive_cells)
    set_cells(alive_cells, dead_color)
    set_cells(now_alive_cells, alive_color)
    alive_cells = now_alive_cells
}

jQuery(window).on('load', function () {
    generateBoard(board_render_size);
    load_options();

    jQuery(".cell").click(function () {
        if (edit_allowed) {
            let cell_id = jQuery(this).attr("id")
            alive_cells.has(cell_id) ? alive_cells.delete(cell_id) : alive_cells.add(cell_id)
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
            alive_cells.has(cell_id) ? alive_cells.delete(cell_id) : alive_cells.add(cell_id)
            toggle_cell(jQuery(this).attr("id"))
        }
    })

    jQuery("#evolve").click(function () {
        nextState()
    })

    jQuery("#animate").click(function () {
        if (is_animating) {
            clearInterval(animate_timer)
            is_animating = false
        }
        else {
            animate_timer = setInterval(nextState, 100)
            is_animating = true
        }
    })

    jQuery('#reset').click(function () {
        set_cells(alive_cells, dead_color)
        alive_cells = new Set()
    })

    jQuery('#export').click(function () {
        alert('Copy game state:' + serialize_set(alive_cells))
        // TODO: pop-up to copy from
    })

    jQuery('#import').click(function () {
        // TODO: implement text box like adarkroom.doublespeakgames.com
    })

    jQuery('#load').click(function () {
        set_cells(alive_cells, dead_color)
        alive_cells = load_state(jQuery('#choose_state').val())
        set_cells(alive_cells, alive_color)
    })

})