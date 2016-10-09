import { Five, KeyPress } from '../vendors';

export class ServoModule {
    constructor() { 
        this.platformBottomServo = {};
        this.platformUpperServo = {};
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

        this.platformBottomServo.center();
        this.platformUpperServo.center();

        this.initKeyHandling();
    }

    initKeyHandling() {
        KeyPress()(process.stdin);

        process.stdin.on("keypress", (ch, key) => this.keyControl(ch, key));
        process.stdin.setRawMode(true);
        process.stdin.resume();
    }

    keyControl(ch, key) {
        if (key) {
            switch (key.name) {
                case 'w': this.platformUp(); break;
                case 's': this.platformDown(); break;
                case 'a': this.platformRight(); break;
                case 'd': this.platformLeft(); break;
                case 'space': this.servoStop(); break;
                default: break;
            }
        }
    }

    platformUp() {
        console.log('w pressed');
        this.platformUpperServo.to(180);
    }

    platformDown() {
        this.platformUpperServo.to(0);
    }

    platformRight() {
        this.platformBottomServo.to(180);
    }

    platformLeft() {
        this.platformBottomServo.to(0);
    }

    servoStop() {
        this.platformUpperServo.stop();
        this.platformBottomServo.stop();
    }
}