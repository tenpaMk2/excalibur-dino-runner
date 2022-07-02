import {
  BaseAlign,
  Color,
  Engine,
  Entity,
  Font,
  ScreenElement,
  Text,
  TextAlign,
  Trigger,
  Vector,
} from "excalibur";
import config from "../config";
import { Resources } from "../resource";
import { Dino } from "./dino";

export class Goal extends Trigger {
  clearScreen: ScreenElement | null = null;
  clearMessage: ScreenElement | null = null;

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
    engine.currentScene.add(this.clearScreen);

    const sprite = Resources.clear.toSprite();
    this.clearMessage = new ScreenElement({
      x: engine.halfDrawWidth * config.zoom - sprite.width / 2, // bug?
      y: engine.halfDrawHeight * config.zoom - sprite.height / 2, // bug?
    });

    this.clearMessage.graphics.use(sprite);
    engine.currentScene.add(this.clearMessage);
  }

  reset() {
    if (this.clearScreen) this.clearScreen.kill();
    if (this.clearMessage) this.clearMessage.kill();
  }
}
