import { Five } from '../vendors';

export class BoardModule {
    constructor(port) {
        this.port = port;
    }
    
    initBoard() {
        let board = new Five().Board({
            port: this.port
        });

        let promise = new Promise((resolve, reject) => {
            board.on('ready', () => resolve());
        });

        return promise;
    }
}
