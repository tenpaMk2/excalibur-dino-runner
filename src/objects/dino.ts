import {
  Actor,
  Animation,
  CollisionGroupManager,
  CollisionType,
  Engine,
  Events,
  SpriteSheet,
  Vector,
} from "excalibur";
import config from "../config";
import { Resources } from "../resource";

export type dinoType = "doux" | "mort" | "tard" | "vita";

export class Dino extends Actor {
  private isLanding: boolean = false;

  constructor(private x: number, private y: number, private type: dinoType) {
    super({
      x: x,
      y: y,
      width: 14,
      height: 14,
      collisionType: CollisionType.Active,
    });
  }

  onInitialize(engine: Engine): void {
    this.playRunAnimation();

    this.acc = Vector.Right.scale(config.dinoXAcc);

    this.generateHitBox(engine);
  }

  playRunAnimation() {
    let image;
    switch (this.type) {
      case "doux":
        image = Resources.doux;
        break;
      case "mort":
        image = Resources.mort;
        break;
      case "tard":
        image = Resources.tard;
        break;
      case "vita":
        image = Resources.vita;
        break;
      default:
        throw Error("Invalid dino type!!");
    }

    const spriteSheet = SpriteSheet.fromImageSource({
      image: image,
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
  }

  playCryAnimation() {
    let image;
    switch (this.type) {
      case "doux":
        image = Resources.doux;
        break;
      case "mort":
        image = Resources.mort;
        break;
      case "tard":
        image = Resources.tard;
        break;
      case "vita":
        image = Resources.vita;
        break;
      default:
        throw Error("Invalid dino type!!");
    }

    const spriteSheet = SpriteSheet.fromImageSource({
      image: image,
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
          graphic: spriteSheet.getSprite(14, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(15, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(16, 0)!,
          duration: 100,
        },
      ],
    });

    this.graphics.use(animation);
  }

  private generateHitBox(engine: Engine): void {
    let collisionGroup = CollisionGroupManager.groupByName("dino");
    if (!collisionGroup) {
      collisionGroup = CollisionGroupManager.create("dino");
    }

    const underBox = new Actor({
      y: 7,
      width: 7,
      height: 1,
      collisionType: CollisionType.Passive,
      collisionGroup: collisionGroup,
    });
    this.addChild(underBox);
    engine.currentScene.add(underBox);

    underBox.on("collisionstart", (event: Events.CollisionStartEvent): void => {
      Resources.dinoLandingSound.play();
      this.isLanding = true;
    });
    underBox.on("collisionend", (event: Events.CollisionEndEvent): void => {
      this.isLanding = false;
    });

    const rightBox = new Actor({
      x: 7,
      width: 1,
      height: 7,
      collisionType: CollisionType.Passive,
      collisionGroup: collisionGroup,
    });
    this.addChild(rightBox);
    engine.currentScene.add(rightBox);

    rightBox.on("collisionstart", (event: Events.CollisionStartEvent): void => {
      Resources.dinoBlockedSound.play();
    });

    this.body.group = collisionGroup;
  }

  onPreUpdate(engine: Engine): void {
    this.vel.x =
      this.vel.x < config.dinoMaxXSpeed ? this.vel.x : config.dinoMaxXSpeed;
  }

  jump = (power: number): void => {
    if (this.isLanding) this.vel.y = -config.dinoJumpVel * power;
  };

  reset() {
    this.pos = new Vector(this.x, this.y);
    this.vel = Vector.Zero;
    this.acc = Vector.Right.scale(config.dinoXAcc);
    this.playRunAnimation();
  }

  slashed = (): void => {
    this.acc = Vector.Zero;
    this.playCryAnimation();
    Resources.dinoSlashedSound.play();
  };
}
