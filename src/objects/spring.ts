import {
  Actor,
  CollisionType,
  Engine,
  PreCollisionEvent,
  Vector,
} from "excalibur";
import config from "../config";
import { Resources } from "../resource";
import { Dino } from "./dino";
import { ResourceManager } from "./resource-manager";

class Spring extends Actor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    anchor: Vector
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      anchor: anchor,
      collisionType: CollisionType.Passive,
    });
  }

  onInitialize(engine: Engine): void {
    this.stretch();

    this.on("precollision", (event: PreCollisionEvent): void => {
      if (!(event.other instanceof Dino)) return;

      this.outstretch();
      this.bounce(event.other);

      if (!Resources.springSound.isPlaying()) {
        Resources.springSound.play();
      }

      engine.clock.schedule(() => {
        this.stretch();
      }, config.springStretchTime);
    });
  }

  protected stretch() {
    // implement
  }

  protected outstretch() {
    // implement
  }

  protected bounce(bounced: Actor) {
    // implement
  }
}

export class UpSpring extends Spring {
  constructor(objX: number, objY: number, objWidth: number, objHeight: number) {
    super(
      objX + objWidth / 2,
      objY + objHeight,
      objWidth,
      objHeight,
      new Vector(0.5, 1)
    );
  }

  protected stretch() {
    const stretchedSprite = ResourceManager.getUpStretchedSpringSprite();
    this.graphics.use(stretchedSprite);
  }

  protected outstretch() {
    const outstretchedSprite = ResourceManager.getUpOutstretchedSpringSprite();
    this.graphics.use(outstretchedSprite);
  }

  protected bounce(bounced: Actor) {
    bounced.vel.y = -config.leftSpringVel;
  }
}

export class RightSpring extends Spring {
  constructor(objX: number, objY: number, objWidth: number, objHeight: number) {
    super(objX, objY + objHeight / 2, objWidth, objHeight, new Vector(0, 0.5));
  }

  protected stretch() {
    const stretchedSprite = ResourceManager.getRightStretchedSpringSprite();
    this.graphics.use(stretchedSprite);
  }

  protected outstretch() {
    const outstretchedSprite =
      ResourceManager.getRightOutstretchedSpringSprite();
    this.graphics.use(outstretchedSprite);
  }

  protected bounce(bounced: Actor) {
    bounced.vel.x = config.rightSpringVel;
  }
}

export class DownSpring extends Spring {
  constructor(objX: number, objY: number, objWidth: number, objHeight: number) {
    super(objX + objWidth / 2, objY, objWidth, objHeight, new Vector(0.5, 0));
  }

  protected stretch() {
    const stretchedSprite = ResourceManager.getDownStretchedSpringSprite();
    this.graphics.use(stretchedSprite);
  }

  protected outstretch() {
    const outstretchedSprite =
      ResourceManager.getDownOutstretchedSpringSprite();
    this.graphics.use(outstretchedSprite);
  }

  protected bounce(bounced: Actor) {
    bounced.vel.y = config.downSpringVel;
  }
}

export class LeftSpring extends Spring {
  constructor(objX: number, objY: number, objWidth: number, objHeight: number) {
    super(
      objX + objWidth,
      objY + objHeight / 2,
      objWidth,
      objHeight,
      new Vector(1, 0.5)
    );
  }

  protected stretch() {
    const stretchedSprite = ResourceManager.getLeftStretchedSpringSprite();
    this.graphics.use(stretchedSprite);
  }

  protected outstretch() {
    const outstretchedSprite =
      ResourceManager.getLeftOutstretchedSpringSprite();
    this.graphics.use(outstretchedSprite);
  }

  protected bounce(bounced: Actor) {
    bounced.vel.x = -config.leftSpringVel;
  }
}
