import { Engine, LockCameraToActorStrategy, Scene, Timer } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import config from "../config";
import { Dino } from "../objects/dino";
import { Resources } from "../resource";

export class GameScene extends Scene {
  onInitialize(_engine: Engine): void {
    Resources.tiledmap.addTiledMapToScene(this);

    const dino = new Dino(0, 200);
    _engine.add(dino);

    let timer = new Timer({
      interval: config.dinoMaxPowerTime,
      fcn: () => {
        console.log("max power!!");
      },
    });
    _engine.add(timer);

    _engine.input.pointers.primary.on("down", (event: PointerEvent): void => {
      timer.start();
    });
    _engine.input.pointers.primary.on("up", (event: PointerEvent): void => {
      console.log(timer.timeElapsedTowardNextAction);
      dino.jump(
        timer.timeElapsedTowardNextAction === 0
          ? config.dinoMaxPowerTime
          : timer.timeElapsedTowardNextAction
      );
    });

    this.camera.addStrategy(new LockCameraToActorStrategy(dino));
    this.camera.zoom = config.zoom;
  }
}
