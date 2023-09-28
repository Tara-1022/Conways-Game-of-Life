const dead_color = 'black'
const alive_color = 'yellow'
const board_size = 50;
// row id -> row_<ind>
// cell id -> cell_<row>.<col>

var alive_cells = new Set()

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

function set_cells(cells, color) {
    let cell;
    for (cell_id of cells) {
        cell = document.getElementById("cell_" + cell_id)
        cell.style.backgroundColor = color
    }
}


jQuery(window).on('load', function () {
    generateBoard(board_size);

    jQuery("#add").click(function () {
        console.log("input caught")
        alive_cells.add(jQuery("#in").val())
    })

    jQuery("#change").click(function () {
        set_cells(alive_cells, alive_color)
    })

})