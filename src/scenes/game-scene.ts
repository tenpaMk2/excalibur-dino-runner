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
import { Resetter } from "../objects/resetter";
import { TapUI } from "../objects/tap-ui";
import { Resources } from "../resource";

export class GameScene extends Scene {
  engine!: Engine;
  dino!: Dino;
  tapUI!: TapUI;
  powerGauge!: PowerGauge;
  goal!: Goal;
  tempCredits!: ScreenElement;
  reaper!: Reaper;
  resetter!: Resetter;

  onInitialize(_engine: Engine): void {
    this.engine = _engine;

    Resources.tiledmap.addTiledMapToScene(this);

    this.dino = new Dino(30, 200);
    this.add(this.dino);

    this.tapUI = new TapUI(_engine);
    this.tapUI.registerTapUpCallback(this.dino.jump);

    this.powerGauge = new PowerGauge();
    this.add(this.powerGauge);
    this.powerGauge.registerGetProgressCallback(this.tapUI.getTimerProgress);
    this.dino.addChild(this.powerGauge);

    const tileWidth = Resources.tiledmap.data.tileWidth;
    const tileHeight = Resources.tiledmap.data.tileHeight;
    const mapHeight = Resources.tiledmap.data.height;
    this.goal = new Goal(
      _engine,
      tileWidth * config.goalCol,
      0,
      tileWidth,
      tileHeight * mapHeight
    );
    this.add(this.goal);

    this.tempCredits = new ScreenElement({
      x: 0,
      y: _engine.drawHeight - 10,
    });
    this.tempCredits.graphics.use(
      new Text({
        text: "<Credits> dino graphic -> @ArksDigital, mapchip and sound -> kenney.nl",
        color: Color.White,
        font: new Font({
          size: 24,
        }),
      })
    );
    this.add(this.tempCredits);

    this.reaper = new Reaper(0, 0, tileWidth, mapHeight);
    this.add(this.reaper);
    this.reaper.registerSlashCallback(this.dino.slashed);

    this.resetter = new Resetter(_engine.drawWidth - 4, 24);
    this.add(this.resetter);
    this.resetter.registerResetCallback(this.resetStage);

    this.camera.addStrategy(new LockCameraToActorStrategy(this.dino));
    this.camera.zoom = config.zoom;
  }

  resetStage = (): void => {
    this.dino.reset();
    this.reaper.reset();
    this.goal.reset();
  };
}
