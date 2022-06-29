import { Actor, Canvas, CollisionType, Engine, Vector } from "excalibur";

export class PowerGauge extends Actor {
  getProgressCallback: (() => number) | null = null;

  constructor() {
    super({
      pos: Vector.Zero,
      collisionType: CollisionType.PreventCollision,
    });
    this.z = 1;
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    const canvas = new Canvas({
      cache: false,
      height: 32,
      width: 32,
      draw: (ctx: CanvasRenderingContext2D) => {
        if (!this.getProgressCallback)
          throw Error("Have not registered getProgress callback!!");

        ctx.strokeStyle = "chartreuse";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(16, 16, 15, 0, Math.PI * 2 * this.getProgressCallback(), false);
        ctx.stroke();
      },
    });
    this.graphics.use(canvas);
  }

  registerGetProgressCallback(callback: () => number) {
    this.getProgressCallback = callback;
  }
}
