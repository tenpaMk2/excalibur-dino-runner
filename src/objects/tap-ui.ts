import { Engine, Timer } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import config from "../config";

export class TapUI {
  private timer: Timer;
  private isAccumulatingPower: boolean = false;
  private tapUpCallback: ((power: number) => void) | null = null;

  constructor(private engine: Engine) {
    this.timer = new Timer({
      interval: config.dinoMaxPowerTime,
    });
    engine.add(this.timer);

    engine.input.pointers.primary.on("down", (event: PointerEvent): void => {
      this.timer.start();
      this.isAccumulatingPower = true;
    });

    engine.input.pointers.primary.on("up", (event: PointerEvent): void => {
      if (!this.tapUpCallback)
        throw Error("Have not registered tap-up callback!!");

      this.tapUpCallback(this.getTimerProgress());
      this.timer.stop();
      this.timer.reset();
      this.isAccumulatingPower = false;
    });
  }

  registerTapUpCallback(callback: (power: number) => void) {
    this.tapUpCallback = callback;
  }

  getTimerProgress() {
    if (!this.isAccumulatingPower) return 0;
    return 1 - this.timer.timeToNextAction / config.dinoMaxPowerTime;
  }
}
