import { Five, KeyPress, GamePad } from '../vendors';

export class MotorModule {
    constructor(speed) {
        this.speed = speed;
        this.frontMotors = {};
        this.backMotors = {}
     }
    
    initMotors() {
        let configs = Five().Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
        
        this.frontMotors = {
            right: new Five().Motor(configs.M4),
            left: new Five().Motor(configs.M1)
        };

        this.backMotors = {
            right: new Five().Motor(configs.M3),
            left: new Five().Motor(configs.M2)
        };

        this.initGamePad();
    }

    initGamePad() {
        let gamePad = new GamePad('n64/retrolink');

        gamePad.connect();

        gamePad.on('center:move', (coords) => {
            if (coords.x == 127 && coords.y == 0) this.motorsForward();
            if (coords.x == 127 && coords.y == 255) this.motorsBackward();
            if (coords.x == 0 && coords.y == 127) this.motorsLeft();
            if (coords.x == 255 && coords.y == 127) this.motorsRight();
            if (coords.x == 127 && coords.y == 127) this.motorsStop();
        });
    }

    motorsForward() {
        this.frontMotors.right.forward(this.speed);
        this.frontMotors.left.forward(this.speed);
        this.backMotors.right.forward(this.speed);
        this.backMotors.left.forward(this.speed);
    }

    motorsBackward() {
        this.frontMotors.right.reverse(this.speed);
        this.frontMotors.left.reverse(this.speed);
        this.backMotors.right.reverse(this.speed);
        this.backMotors.left.reverse(this.speed);
    }

    motorsRight() {
        this.frontMotors.right.reverse(this.speed);
        this.frontMotors.left.forward(this.speed);
        this.backMotors.right.reverse(this.speed);
        this.backMotors.left.forward(this.speed);
    }

    motorsLeft() {
        this.frontMotors.right.forward(this.speed);
        this.frontMotors.left.reverse(this.speed);
        this.backMotors.right.forward(this.speed);
        this.backMotors.left.reverse(this.speed);
    }

    motorsStop() {
        this.frontMotors.right.stop();
        this.frontMotors.left.stop();
        this.backMotors.right.stop();
        this.backMotors.left.stop();
    }
}