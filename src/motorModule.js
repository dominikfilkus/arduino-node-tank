import { Five, KeyPress } from '../vendors';

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

        this.initKeyHandling();
    }

    initKeyHandling() {
        KeyPress()(process.stdin);

        process.stdin.on("keypress", (ch, key) => this.keyControl(ch, key));
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }

    keyControl(ch, key) {
        console.log(key);
        console.log(ch);
        if (key) {
            switch (key.name) {
                case 'up': this.motorsForward(); break;
                case 'down': this.motorsBackward(); break;
                case 'right': this.motorsRight(); break;
                case 'left': this.motorsLeft(); break;
                case 'space': this.motorsStop(); break;
                default: break;
            }
        }
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