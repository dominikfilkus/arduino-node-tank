export function Five() {
    return require('johnny-five');
}

export function KeyPress() {
    return require('Keypress');
}

export function GamePad(type) {
    let GamePad = require('node-gamepad');
    return new GamePad(type);
}