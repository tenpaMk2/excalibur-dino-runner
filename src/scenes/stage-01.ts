import {
  Engine,
  LockCameraToActorStrategy,
  Scene,
  SceneActivationContext,
} from "excalibur";
import config from "../config";
import { Dino } from "../objects/dino";
import { Goal } from "../objects/goal";
import { PowerGauge } from "../objects/power-gauge";
import { Reaper } from "../objects/reaper";
import { Resetter } from "../objects/resetter";
import { TapUI } from "../objects/tap-ui";
import { Resources } from "../resource";

export class Stage01 extends Scene {
  engine!: Engine;
  dino!: Dino;
  tapUI!: TapUI;
  powerGauge!: PowerGauge;
  goal!: Goal;
  reaper!: Reaper;
  resetter!: Resetter;

  onInitialize(_engine: Engine): void {
    this.engine = _engine;

    Resources.stage01Tmx.addTiledMapToScene(this);
    Resources.stage01Tmx.getTileMapLayers().forEach((tilemap) => {
      tilemap.z = 0;
    });

    this.dino = new Dino(30, 200, "vita");
    this.add(this.dino);

    this.tapUI = new TapUI(_engine);
    this.tapUI.registerTapUpCallback(this.dino.jump);

    this.powerGauge = new PowerGauge();
    this.add(this.powerGauge);
    this.powerGauge.registerGetProgressCallback(this.tapUI.getTimerProgress);
    this.dino.addChild(this.powerGauge);

    const tileWidth = Resources.stage01Tmx.data.tileWidth;
    const tileHeight = Resources.stage01Tmx.data.tileHeight;
    const mapHeight = Resources.stage01Tmx.data.height;
    this.goal = new Goal(
      _engine,
      tileWidth * config.goalCol,
      0,
      tileWidth,
      tileHeight * mapHeight
    );
    this.add(this.goal);

    this.reaper = new Reaper(0, 0, tileWidth, mapHeight);
    this.add(this.reaper);
    this.reaper.registerSlashCallback(this.dino.slashed);

    this.resetter = new Resetter(_engine.drawWidth - 4, 24);
    this.add(this.resetter);
    this.resetter.registerResetCallback(this.resetStage);

    this.camera.addStrategy(new LockCameraToActorStrategy(this.dino));
    this.camera.zoom = config.zoom;
  }

  onActivate(ctx: SceneActivationContext): void {
    this.resetStage();
  }

  resetStage = (): void => {
    this.dino.reset();
    this.reaper.reset();
    this.goal.reset();
  };
}
