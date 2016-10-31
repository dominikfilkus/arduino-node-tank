import { BoardModule } from './src/boardModule';
import { MotorModule } from './src/motorModule';
import { ServoModule } from './src/servoModule';

const port = 'COM26';
const speed = 255;

let boardModule = new BoardModule(port);
let motorModule = new MotorModule(speed);
let servoModule = new ServoModule();

boardModule.initBoard().then(() => {
    motorModule.initMotors();
    servoModule.initServos();
});


