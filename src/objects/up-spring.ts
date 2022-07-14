import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Engine,
  Vector,
} from "excalibur";
import config from "../config";
import { ResourceManager } from "./resource-manager";

export class UpSpring extends Actor {
  constructor(
    engine: Engine,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super({
      x: x,
      y: y + height,
      width: width,
      height: height,
      anchor: new Vector(0, 1),
      collisionType: CollisionType.Fixed,
    });
  }

  onInitialize(engine: Engine): void {
    const stretchedSprite = ResourceManager.getUpStretchedSpringSprite();
    this.graphics.use(stretchedSprite);

    this.on("collisionstart", (event: CollisionStartEvent): void => {
      const outstretchedSprite =
        ResourceManager.getUpOutstretchedSpringSprite();
      this.graphics.use(outstretchedSprite);

      event.other.vel.y = -config.upSpringVel;

      engine.clock.schedule(() => {
        this.graphics.use(stretchedSprite);
      }, 100);
    });
  }
}
