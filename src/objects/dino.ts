import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  Events,
  SpriteSheet,
  Vector,
} from "excalibur";
import config from "../config";
import { Resources } from "../resource";

export class Dino extends Actor {
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 18,
      height: 18,
      collisionType: CollisionType.Active,
    });
  }

  onInitialize(engine: Engine): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.dino,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });

    const animation = new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(4, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(5, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(6, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(7, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(8, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(9, 0)!,
          duration: 100,
        },
      ],
    });

    this.graphics.use(animation);

    this.on("collisionstart", (event: Events.CollisionStartEvent): void => {
      if (event.contact.normal.equals(Vector.Up)) {
        Resources.dinoLanding.play();
      }
    });

    this.acc = Vector.Right.scale(config.dinoXAcc);
  }

  onPreUpdate(engine: Engine): void {
    this.vel.x =
      this.vel.x < config.dinoMaxXSpeed ? this.vel.x : config.dinoMaxXSpeed;
  }

  jump(): void {
    this.vel.y = -config.dinoJumpVel;
  }
}
