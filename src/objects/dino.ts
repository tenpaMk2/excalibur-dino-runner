import {
  Actor,
  Animation,
  CollisionType,
  Engine,
  PostCollisionEvent,
  Side,
  Vector,
} from "excalibur";
import config from "../config";
import { Resources } from "../resource";
import { ResourceManager } from "./resource-manager";

export type dinoType = "doux" | "mort" | "tard" | "vita";

export class Dino extends Actor {
  private touchedEdges: Side[] = [];
  private canJumpPreviousFrame: boolean = false;
  private isBlockedPreviousFrame: boolean = false;

  constructor(private x: number, private y: number, private type: dinoType) {
    super({
      x: x,
      y: y,
      width: 14,
      height: 14,
    });
  }

  onInitialize(engine: Engine): void {
    this.reset();

    this.generateHitBox(engine);
  }

  playRunAnimation() {
    let animation: Animation;
    switch (this.type) {
      case "doux":
        animation = ResourceManager.getDinoDouxRunAnimation();
        break;
      case "mort":
        animation = ResourceManager.getDinoMortRunAnimation();
        break;
      case "tard":
        animation = ResourceManager.getDinoTardRunAnimation();
        break;
      case "vita":
        animation = ResourceManager.getDinoVitaRunAnimation();
        break;
    }

    this.graphics.use(animation);
  }

  playCryAnimation() {
    let animation: Animation;
    switch (this.type) {
      case "doux":
        animation = ResourceManager.getDinoDouxCryAnimation();
        break;
      case "mort":
        animation = ResourceManager.getDinoMortCryAnimation();
        break;
      case "tard":
        animation = ResourceManager.getDinoTardCryAnimation();
        break;
      case "vita":
        animation = ResourceManager.getDinoVitaCryAnimation();
        break;
    }

    this.graphics.use(animation);
  }

  private generateHitBox(engine: Engine): void {
    this.on("postcollision", (event: PostCollisionEvent): void => {
      if (!this.canJumpPreviousFrame && event.side === Side.Bottom) {
        Resources.dinoLandingSound.play();
      }
      if (!this.isBlockedPreviousFrame && event.side === Side.Right) {
        Resources.dinoBlockedSound.play();
      }
      this.touchedEdges.push(event.side);
    });
  }

  onPreUpdate(engine: Engine): void {
    if (this.isSlashed()) return;

    if (this.vel.x < config.dinoMaxXSpeed) {
      this.acc.x = config.dinoXAcc;
    } else {
      this.acc.x = 0;
    }

    this.canJumpPreviousFrame = this.canJump();
    this.isBlockedPreviousFrame = this.isBlocked();
    this.touchedEdges.length = 0; // reset
  }

  jump = (power: number): void => {
    if (this.canJump()) this.vel.y = -config.dinoJumpVel * power;
  };

  private canJump(): boolean {
    return !this.isSlashed() && this.touchedEdges.includes(Side.Bottom);
  }

  private isBlocked(): boolean {
    return this.touchedEdges.includes(Side.Right);
  }

  private isSlashed(): boolean {
    return this.body.collisionType === CollisionType.PreventCollision;
  }

  reset() {
    this.pos = new Vector(this.x, this.y);
    this.vel = Vector.Zero;
    this.acc = Vector.Right.scale(config.dinoXAcc);
    this.body.collisionType = CollisionType.Active;
    this.playRunAnimation();
  }

  slashed = (): void => {
    this.acc = Vector.Zero;
    this.vel = Vector.Zero;
    this.playCryAnimation();
    this.body.collisionType = CollisionType.PreventCollision;
    Resources.dinoSlashedSound.play();
  };
}
