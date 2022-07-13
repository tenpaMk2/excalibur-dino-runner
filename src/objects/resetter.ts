import { CollisionType, Engine, ScreenElement, Vector } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { Resources } from "../resource";

export class Resetter extends ScreenElement {
  private resetCallback: (() => void) | null = null;

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      collisionType: CollisionType.PreventCollision,
      scale: new Vector(0.5, 0.5),
    });
  }

  onInitialize(engine: Engine): void {
    const sprite = Resources.reset.toSprite();
    this.graphics.use(sprite);
    this.graphics.anchor = new Vector(1, 0);
    this.collider.useBoxCollider(sprite.width, sprite.height, new Vector(1, 0));

    this.on("pointerdown", (event: PointerEvent): void => {
      if (!this.resetCallback)
        throw Error("Have not registered reset callback!!");

      this.resetCallback();
    });
  }

  registerResetCallback(callback: () => void) {
    this.resetCallback = callback;
  }
}
