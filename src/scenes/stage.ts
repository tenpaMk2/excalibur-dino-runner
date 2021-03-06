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
import {
  DownSpring,
  LeftSpring,
  RightSpring,
  UpSpring,
} from "../objects/spring";
import { PowerGauge } from "../objects/power-gauge";
import { Reaper } from "../objects/reaper";
import { Resetter } from "../objects/resetter";
import { TapUI } from "../objects/tap-ui";
import { Resources } from "../resource";

type SpringName = "up-spring" | "right-spring" | "down-spring" | "left-spring";

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

  onInitialize(engine: Engine): void {
    this.engine = engine;

    let stageResource: TiledMapResource;
    switch (this.stageNumber) {
      case 1:
        stageResource = Resources.stage01Tmx;
        break;
      case 2:
        stageResource = Resources.stage02Tmx;
        break;
      case 3:
        stageResource = Resources.stage03Tmx;
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
      case 3:
        this.dino = new Dino(30, 200, "doux");
        break;
      default:
        throw Error("invalid stage number!!");
    }
    engine.add(this.dino);

    this.tapUI = new TapUI(engine);
    this.tapUI.registerTapUpCallback(this.dino.jump);

    this.powerGauge = new PowerGauge();
    engine.add(this.powerGauge);
    this.powerGauge.registerGetProgressCallback(this.tapUI.getTimerProgress);
    this.dino.addChild(this.powerGauge);

    this.initGoal(engine, stageResource);

    this.initSpring(engine, stageResource);

    const tileWidth = stageResource.data.tileWidth;
    const mapHeight = stageResource.data.height;

    this.reaper = new Reaper(0, 0, tileWidth, mapHeight);
    engine.add(this.reaper);
    this.reaper.registerSlashCallback(this.dino.slashed);

    this.resetter = new Resetter(engine.drawWidth, 0);
    engine.add(this.resetter);
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
    engine.add(this.goal);
  }

  initSpring(engine: Engine, stageResource: TiledMapResource): void {
    this.initSpringCore(engine, stageResource, "up-spring");
    this.initSpringCore(engine, stageResource, "right-spring");
    this.initSpringCore(engine, stageResource, "down-spring");
    this.initSpringCore(engine, stageResource, "left-spring");
  }

  initSpringCore(
    engine: Engine,
    stageResource: TiledMapResource,
    springName: SpringName
  ): void {
    const objects = stageResource.data.getExcaliburObjects();
    const springObjects = objects[0]?.getObjectsByName(springName);
    if (!springObjects)
      throw Error(`cannot find the ${springName} object from \`.tmx\` .`);

    springObjects.forEach((springObject) => {
      if (!springObject.width) {
        throw Error(
          `cannot find the width of the ${springName} object from \`.tmx\` .`
        );
      }
      if (!springObject.height) {
        throw Error(
          `cannot find the height of the ${springName} object from \`.tmx\` .`
        );
      }

      switch (springName) {
        case "up-spring":
          const upSpring = new UpSpring(
            springObject.x,
            springObject.y,
            springObject.width,
            springObject.height
          );
          engine.add(upSpring);
          return;
        case "right-spring":
          const rightSpring = new RightSpring(
            springObject.x,
            springObject.y,
            springObject.width,
            springObject.height
          );
          engine.add(rightSpring);
          return;
        case "down-spring":
          const downSpring = new DownSpring(
            springObject.x,
            springObject.y,
            springObject.width,
            springObject.height
          );
          engine.add(downSpring);
          return;
        case "left-spring":
          const leftSpring = new LeftSpring(
            springObject.x,
            springObject.y,
            springObject.width,
            springObject.height
          );
          engine.add(leftSpring);
          return;
      }
    });
  }
}
