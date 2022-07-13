import { TiledMapResource } from "@excaliburjs/plugin-tiled";
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
import { UpperSpring } from "../objects/upper-spring";
import { Resources } from "../resource";

export class Stage extends Scene {
  engine!: Engine;
  dino!: Dino;
  tapUI!: TapUI;
  powerGauge!: PowerGauge;
  goal!: Goal;
  reaper!: Reaper;
  resetter!: Resetter;

  constructor(private stageNumber: number) {
    super();
  }

  onInitialize(_engine: Engine): void {
    this.engine = _engine;

    let stageResource: TiledMapResource;
    switch (this.stageNumber) {
      case 1:
        stageResource = Resources.stage01Tmx;
        break;
      case 2:
        stageResource = Resources.stage02Tmx;
        break;
      default:
        throw Error("invalid stage number!!");
    }

    stageResource.addTiledMapToScene(this);
    stageResource.getTileMapLayers().forEach((tilemap) => {
      tilemap.z = 0;
    });

    switch (this.stageNumber) {
      case 1:
        this.dino = new Dino(30, 200, "vita");
        break;
      case 2:
        this.dino = new Dino(30, 200, "tard");
        break;
      default:
        throw Error("invalid stage number!!");
    }
    this.add(this.dino);

    this.tapUI = new TapUI(_engine);
    this.tapUI.registerTapUpCallback(this.dino.jump);

    this.powerGauge = new PowerGauge();
    this.add(this.powerGauge);
    this.powerGauge.registerGetProgressCallback(this.tapUI.getTimerProgress);
    this.dino.addChild(this.powerGauge);

    this.initGoal(_engine, stageResource);

    this.initUpperSpring(_engine, stageResource);

    const tileWidth = stageResource.data.tileWidth;
    const mapHeight = stageResource.data.height;

    this.reaper = new Reaper(0, 0, tileWidth, mapHeight);
    this.add(this.reaper);
    this.reaper.registerSlashCallback(this.dino.slashed);

    this.resetter = new Resetter(_engine.drawWidth, 0);
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

  initGoal(engine: Engine, stageResource: TiledMapResource): void {
    const objects = stageResource.data.getExcaliburObjects();
    const goalObject = objects[0]?.getObjectByName("goal");
    if (!goalObject) throw Error("cannot find the goal object from `.tmx` .");

    if (!goalObject.width) {
      throw Error("cannot find the width of the goal object from `.tmx` .");
    }
    if (!goalObject.height) {
      throw Error("cannot find the height of the goal object from `.tmx` .");
    }

    this.goal = new Goal(
      engine,
      goalObject.x,
      goalObject.y,
      goalObject.width,
      goalObject.height
    );
    this.add(this.goal);
  }

  initUpperSpring(engine: Engine, stageResource: TiledMapResource): void {
    const objects = stageResource.data.getExcaliburObjects();
    const springObjects = objects[0]?.getObjectsByName("upper-spring");
    if (!springObjects)
      throw Error("cannot find the upper-spring object from `.tmx` .");

    springObjects.forEach((springObject) => {
      if (!springObject.width) {
        throw Error(
          "cannot find the width of the upper-spring object from `.tmx` ."
        );
      }
      if (!springObject.height) {
        throw Error(
          "cannot find the height of the upper-spring object from `.tmx` ."
        );
      }

      const spring = new UpperSpring(
        engine,
        springObject.x,
        springObject.y,
        springObject.width,
        springObject.height
      );
      this.add(spring);
    });
  }
}
