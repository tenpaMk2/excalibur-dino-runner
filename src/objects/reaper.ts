import {
  Actor,
  BaseAlign,
  CollisionStartEvent,
  CollisionType,
  Color,
  Engine,
  Font,
  GraphicsGroup,
  ScreenElement,
  SpriteSheet,
  Text,
  TextAlign,
  Vector,
} from "excalibur";
import config from "../config";
import { Resources } from "../resource";
import { Dino } from "./dino";

export class Reaper extends Actor {
  deathScreen: ScreenElement | null = null;
  deathMessage: ScreenElement | null = null;
  engine!: Engine;
  slashCallback: (() => void) | null = null;

  constructor(
    private x: number,
    private y: number,
    widthHeight: number,
    row: number
  ) {
    super({
      x: x,
      y: y,
      width: config.reaperWidth,
      height: widthHeight * row,
      anchor: Vector.Zero,
      collisionType: CollisionType.Fixed,
      color: Color.Magenta,
    });

    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.mapchip,
      grid: {
        rows: 9,
        columns: 20,
        spriteHeight: 18,
        spriteWidth: 18,
      },
    });

    const sprite = spriteSheet.getSprite(8, 3)!;
    sprite.rotation = Math.PI * 0.5;

    const members = [];
    for (let i = 0; i < row; i++) {
      members.push({
        graphic: sprite,
        pos: new Vector(0, widthHeight * i),
      });
    }

    const graphicsGroup = new GraphicsGroup({
      members: members,
    });

    this.graphics.use(graphicsGroup);
  }

  onInitialize(engine: Engine) {
    this.engine = engine;

    this.initSchedule(engine);

    this.on("collisionstart", (event: CollisionStartEvent): void => {
      if (!(event.other instanceof Dino)) return;
      this.emitDeathMessage(engine);
      if (!this.slashCallback)
        throw Error("Have not registered slash callback!!");
      this.slashCallback();
      this.vel = Vector.Zero;
    });
  }

  private emitDeathMessage(engine: Engine) {
    this.deathScreen = new ScreenElement({
      pos: Vector.Zero,
      width: engine.drawWidth * config.zoom, // bug?
      height: engine.drawHeight * config.zoom, // bug?
      color: Color.Magenta,
      anchor: Vector.Zero,
    });
    this.deathScreen.graphics.opacity = 0.2;
    engine.add(this.deathScreen);

    this.deathMessage = new ScreenElement({
      x: engine.halfDrawWidth * config.zoom, // bug?
      y: engine.halfDrawHeight * config.zoom, // bug?
    });
    this.deathMessage.graphics.use(
      new Text({
        text: "Failed...",
        color: Color.White,
        font: new Font({
          size: 64,
          textAlign: TextAlign.Center,
          baseAlign: BaseAlign.Middle,
        }),
      })
    );
    engine.add(this.deathMessage);
  }

  private initSchedule(engine: Engine) {
    engine.clock.schedule(() => {
      this.vel.x = config.reaperSpeed;
    }, config.reaperStartTime);
  }

  reset() {
    this.pos = new Vector(this.x, this.y);
    this.vel = Vector.Zero;
    this.initSchedule(this.engine);
    if (this.deathScreen) this.deathScreen.kill();
    if (this.deathMessage) this.deathMessage.kill();
  }

  registerSlashCallback(callback: () => void) {
    this.slashCallback = callback;
  }
}
