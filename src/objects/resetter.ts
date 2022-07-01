import {
  CollisionType,
  Color,
  Engine,
  Font,
  ScreenElement,
  Text,
  TextAlign,
  Vector,
} from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";

export class Resetter extends ScreenElement {
  private resetCallback: (() => void) | null = null;

  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      collisionType: CollisionType.PreventCollision,
    });
  }

  onInitialize(engine: Engine): void {
    const text = new Text({
      text: "Reset",
      color: Color.White,
      font: new Font({
        size: 24,
        textAlign: TextAlign.Right,
      }),
    });
    this.graphics.use(text);
    this.collider.useBoxCollider(text.width, text.height, new Vector(1, 1));

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
