import { Five, KeyPress, GamePad } from '../vendors';

export class ServoModule {
    constructor() { 
        this.platformBottomServo = {};
        this.platformUpperServo = {};
        this.triggerServo = {};
    }

    initServos() {
        this.platformBottomServo = new Five().Servo({
            pin: 0,
            controller: "PCA9685",
            address: 0x40
        });

        this.platformUpperServo = new Five().Servo({
            pin: 1,
            controller: "PCA9685",
            address: 0x40 
        });

        this.triggerServo = new Five().Servo.Continuous({
            pin: 2,
            controller: "PCA9685",
            address: 0x40 
        });

        this.platformBottomServo.center();
        this.platformUpperServo.to(70);

        this.initGamePad();
    }

    initGamePad() {
        let gamePad = new GamePad('n64/retrolink');

        gamePad.connect();
        
        gamePad.on('cUp:press', () => this.platformUp());
        gamePad.on('cDown:press', () => this.platformDown());
        gamePad.on('cRight:press', () => this.platformRight());
        gamePad.on('cLeft:press', () => this.platformLeft());

        gamePad.on('cUp:release', () => this.servoStop());
        gamePad.on('cDown:release', ()=> this.servoStop());
        gamePad.on('cRight:release', () => this.servoStop());
        gamePad.on('cLeft:release', () => this.servoStop());

        gamePad.on('a:press', () => this.triggerServoCW());
        gamePad.on('b:press', () => this.triggerServoCCW());

        gamePad.on('a:release', () => this.triggerServoStop());
        gamePad.on('b:release', () => this.triggerServoStop());
    }

    platformUp() {
        this.platformUpperServo.to(this.platformUpperServo.value + 20);
    }

    platformDown() {
        this.platformUpperServo.to(this.platformUpperServo.value - 20);
    }

    platformRight() {
        this.platformBottomServo.to(this.platformBottomServo.value + 20);
    }

    platformLeft() {
        this.platformBottomServo.to(this.platformBottomServo.value - 20);
    }

    triggerServoCW() {
        this.triggerServo.cw(1);
    }

    triggerServoCCW() {
        this.triggerServo.ccw(1);
    }

    triggerServoStop() {
        this.triggerServo.stop();
    }

    servoStop() {
        this.platformUpperServo.stop();
        this.platformBottomServo.stop();
    }
}