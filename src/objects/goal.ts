import {
  Color,
  Engine,
  Entity,
  ScreenElement,
  Trigger,
  Vector,
} from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import config from "../config";
import { Resources } from "../resource";
import { Dino } from "./dino";

export class Goal extends Trigger {
  clearScreen: ScreenElement | null = null;
  clearMessage: ScreenElement | null = null;
  menu: ScreenElement | null = null;

  constructor(
    engine: Engine,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super({
      pos: new Vector(x + width / 2, y + height / 2),
      width: width,
      height: height,
      visible: true,
      action: () => {
        this.emitStageClearMessage(engine);
        this.emitMenu(engine);
        Resources.clearSound.play();
      },
      filter: (actor: Entity) => {
        return actor instanceof Dino;
      },
    });
  }

  private emitStageClearMessage(engine: Engine) {
    this.clearScreen = new ScreenElement({
      pos: Vector.Zero,
      width: engine.drawWidth * config.zoom, // bug?
      height: engine.drawHeight * config.zoom, // bug?
      color: Color.Orange,
      anchor: Vector.Zero,
    });
    this.clearScreen.graphics.opacity = 0.2;
    engine.add(this.clearScreen);

    const sprite = Resources.clear.toSprite();
    this.clearMessage = new ScreenElement({
      x: engine.halfDrawWidth * config.zoom - sprite.width / 2, // bug?
      y: engine.halfDrawHeight * config.zoom - sprite.height / 2, // bug?
    });

    this.clearMessage.graphics.use(sprite);
    engine.add(this.clearMessage);
  }

  private emitMenu(engine: Engine) {
    const sprite = Resources.menu.toSprite();
    sprite.scale = new Vector(0.5, 0.5);
    this.menu = new ScreenElement({
      x: engine.halfDrawWidth * config.zoom - sprite.width / 2,
      y: 400,
      width: sprite.width,
      height: sprite.height,
    });
    engine.add(this.menu);
    this.menu.graphics.use(sprite);

    this.menu.on("pointerdown", (event: PointerEvent): void => {
      engine.goToScene("main-menu");
    });
  }

  reset() {
    if (this.clearScreen) this.clearScreen.kill();
    if (this.clearMessage) this.clearMessage.kill();
    if (this.menu) this.menu.kill();
  }
}
