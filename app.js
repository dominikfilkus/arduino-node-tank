import { BoardModule } from './src/boardModule';
import { MotorModule } from './src/MotorModule';

const port = 'COM4';
const speed = 255;

let boardModule = new BoardModule(port);
let motorModule = new MotorModule(speed);

boardModule.initBoard().then(() => {
    console.log('yesss')
    motorModule.initMotors();
});


