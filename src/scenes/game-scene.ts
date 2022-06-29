import {
  Color,
  Engine,
  Font,
  LockCameraToActorStrategy,
  Scene,
  ScreenElement,
  Text,
} from "excalibur";
import config from "../config";
import { Dino } from "../objects/dino";
import { Goal } from "../objects/goal";
import { PowerGauge } from "../objects/power-gauge";
import { Reaper } from "../objects/reaper";
import { TapUI } from "../objects/tap-ui";
import { Resources } from "../resource";

export class GameScene extends Scene {
  onInitialize(_engine: Engine): void {
    Resources.tiledmap.addTiledMapToScene(this);

    const dino = new Dino(30, 200);
    _engine.add(dino);

    const tapUI = new TapUI(_engine);
    tapUI.registerTapUpCallback(dino.jump);

    const powerGauge = new PowerGauge();
    _engine.add(powerGauge);
    powerGauge.registerGetProgressCallback(tapUI.getTimerProgress);
    dino.addChild(powerGauge);

    const tileWidth = Resources.tiledmap.data.tileWidth;
    const tileHeight = Resources.tiledmap.data.tileHeight;
    const mapHeight = Resources.tiledmap.data.height;
    const goal = new Goal(
      _engine,
      tileWidth * config.goalCol,
      0,
      tileWidth,
      tileHeight * mapHeight
    );
    _engine.add(goal);

    const tempCredits = new ScreenElement({
      x: 0,
      y: _engine.drawHeight - 10,
    });
    tempCredits.graphics.use(
      new Text({
        text: "<Credits> dino graphic -> @ArksDigital, mapchip -> kenney.nl",
        color: Color.White,
        font: new Font({
          size: 24,
        }),
      })
    );
    _engine.add(tempCredits);

    const reaper = new Reaper(0, 0, tileWidth, mapHeight);
    _engine.add(reaper);

    this.camera.addStrategy(new LockCameraToActorStrategy(dino));
    this.camera.zoom = config.zoom;
  }
}
