import {
  Actor,
  Canvas,
  CollisionType,
  Color,
  Engine,
  LockCameraToActorStrategy,
  Scene,
  Vector,
} from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import config from "../config";
import { Dino } from "../objects/dino";
import { TapUI } from "../objects/tap-ui";
import { Resources } from "../resource";

export class GameScene extends Scene {
  onInitialize(_engine: Engine): void {
    Resources.tiledmap.addTiledMapToScene(this);

    const dino = new Dino(0, 200);
    _engine.add(dino);

    const tapUI = new TapUI(_engine);
    tapUI.registerTapUpCallback(dino.jump);

    const powerGauge = new Actor({
      pos: Vector.Zero,
      radius: 100,
      color: Color.Magenta,
      collisionType: CollisionType.PreventCollision,
    });
    _engine.add(powerGauge);
    dino.addChild(powerGauge);

    powerGauge.onPreUpdate = (_engine: Engine, _delta: number): void => {
      const canvas = new Canvas({
        cache: false,
        height: 32,
        width: 32,
        draw: (ctx: CanvasRenderingContext2D) => {
          ctx.strokeStyle = "chartreuse";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(16, 16, 15, 0, Math.PI * 2 * tapUI.getTimerProgress(), false);
          ctx.stroke();
        },
      });
      powerGauge.graphics.use(canvas);
    };

    this.camera.addStrategy(new LockCameraToActorStrategy(dino));
    this.camera.zoom = config.zoom;
  }
}
