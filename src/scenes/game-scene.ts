import { Engine, LockCameraToActorStrategy, Scene } from "excalibur";
import config from "../config";
import { Dino } from "../objects/dino";
import { PowerGauge } from "../objects/power-gauge";
import { TapUI } from "../objects/tap-ui";
import { Resources } from "../resource";

export class GameScene extends Scene {
  onInitialize(_engine: Engine): void {
    Resources.tiledmap.addTiledMapToScene(this);

    const dino = new Dino(0, 200);
    _engine.add(dino);

    const tapUI = new TapUI(_engine);
    tapUI.registerTapUpCallback(dino.jump);

    const powerGauge = new PowerGauge();
    _engine.add(powerGauge);
    powerGauge.registerGetProgressCallback(tapUI.getTimerProgress);
    dino.addChild(powerGauge);

    this.camera.addStrategy(new LockCameraToActorStrategy(dino));
    this.camera.zoom = config.zoom;
  }
}
