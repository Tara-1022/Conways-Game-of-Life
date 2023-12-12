import { evolve } from "./conway_functions.js";
import { alive_color, dead_color, board_render_size } from "./constants.js";
import { set_cells, toggle_cell } from './cell_functions.js'
import { serialize_set, deserialize_set, load_state } from "./import_export.js";
import { generateBoard, load_options, showPopup, hidePopup } from './board_functions.js'
// row id -> row_<ind>
// cell id -> cell_<row>.<col>

var alive_cells = new Set();
var animate_timer;
var drag_state_on = false;
var is_animating = false;

function initialise() {
    generateBoard(board_render_size);
    load_options();
}

function nextState() {
    let now_alive_cells = evolve(alive_cells)
    set_cells(alive_cells, dead_color)
    set_cells(now_alive_cells, alive_color)
    alive_cells = now_alive_cells
}

function start_animating() {
    animate_timer = setInterval(nextState, 100)
    is_animating = true
    jQuery('#pause').attr('hidden', false)
    jQuery('#play').attr('hidden', true)
}

function stop_animating() {
    clearInterval(animate_timer)
    is_animating = false
    jQuery('#pause').attr('hidden', true)
    jQuery('#play').attr('hidden', false)
}

function reset_board(new_cells) {
    set_cells(alive_cells, dead_color)
    alive_cells = new_cells
    set_cells(alive_cells, alive_color)
}

// Main
jQuery(window).on('load', function () {
    initialise();

    // drawing
    jQuery(".cell").click(function () {
        let cell_id = jQuery(this).attr("id")
        alive_cells.has(cell_id) ? alive_cells.delete(cell_id) : alive_cells.add(cell_id)
        toggle_cell(jQuery(this).attr("id"))
    })

    jQuery("#board").mousedown(() => drag_state_on = true)

    jQuery("#board").mouseup(() => drag_state_on = false)

    jQuery(".cell").mouseenter(function () {
        if (drag_state_on) {
            let cell_id = jQuery(this).attr("id")
            alive_cells.has(cell_id) ? alive_cells.delete(cell_id) : alive_cells.add(cell_id)
            toggle_cell(jQuery(this).attr("id"))
        }
    })

    // buttons
    jQuery('#info_card_button').click(() => {
        if (jQuery('#info_card_button').text() == '<') {
            jQuery('#info_card').animate({ width: '30px' })
            jQuery('#info_card_button').text('>')
        }
        else {
            jQuery('#info_card').animate({ width: '50%' })
            jQuery('#info_card_button').text('<')
        }
    })

    jQuery("#evolve").click(() => nextState())

    jQuery("#animate").click(function () {
        if (is_animating) stop_animating();
        else start_animating();
    })

    jQuery('#reset').click(function () {
        stop_animating();
        let status = confirm('Resetting will lose your current state! Continue?')
        if (status) {
            set_cells(alive_cells, dead_color)
            alive_cells = new Set()
        }
    })

    jQuery('.back').click(() => hidePopup())

    jQuery('#export').click(function () {
        stop_animating();
        jQuery('#export_state').val(serialize_set(alive_cells))
        showPopup('export');
    })

    jQuery('#import').click(function () {
        stop_animating();
        showPopup('import')
    })

    jQuery('#import_load').click(function () {
        let status = confirm('Importing will lose your current state! Continue?')
        if (status) {
            reset_board(deserialize_set(jQuery('#import_state').val()))
        }
    })

    jQuery('#load').click(function () {
        stop_animating()
        let status = confirm('Loading will lose your current state! Continue?')
        if (status) reset_board(load_state(jQuery('#choose_state').val()));
    })

})