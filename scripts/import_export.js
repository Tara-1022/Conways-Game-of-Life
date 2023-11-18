import {states} from '../data.js'

function serialize_set(set) {
    return JSON.stringify(
        Array.from(set)
        .map((n) => n.replace('cell_', '')))
}

function deserialize_set(str) {
    return new Set(
        JSON.parse(str)
        .map((n) => ('cell_' + n)))
}

function load_state(name){
    return deserialize_set(states[name].state)
}

function load_state_names(){
    var state_names = {}
    Object.keys(states).forEach(name =>{
        state_names[name] = states[name].disp
    })
    return state_names
}
export { serialize_set, deserialize_set, load_state, load_state_names }