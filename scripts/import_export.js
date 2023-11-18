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

function load_state(state){
    return deserialize_set(states[state])
}

export { serialize_set, deserialize_set, load_state }