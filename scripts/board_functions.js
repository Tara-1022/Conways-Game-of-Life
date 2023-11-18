import {load_state_names} from './import_export.js'
import { dead_color } from './constants.js';


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
    set_min_board_size(n)
}

function set_min_board_size(board_render_size) {
    let cell_size = 12;
    let min_size = (board_render_size * cell_size) + 'px'
    jQuery('#board').css('min_width', min_size).css('width', 'auto !important').css('width', min_size)
    jQuery('#board').css('min_height', min_size).css('height', 'auto !important').css('height', min_size)
}

function load_options() {
    let state_names = load_state_names()
    Object.keys(state_names).forEach(name => {
        jQuery('#choose_state').append("<option value='" + name + "'>" + state_names[name] + "</option>")
    });
}

function showPopup(type) {
    jQuery('#popup_background').attr('hidden', false);
    jQuery('#' + type + '_popup').attr('hidden', false);
}

function hidePopup() {
    jQuery('#popup_background').attr('hidden', true);
    jQuery('.popup').each(function () {
        jQuery(this).attr('hidden', true);
    });
}

export {generateBoard, set_min_board_size, load_options, showPopup, hidePopup}