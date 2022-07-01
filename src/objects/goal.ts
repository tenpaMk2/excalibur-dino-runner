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
        Resources.clear.play();
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

    this.clearMessage = new ScreenElement({
      x: engine.halfDrawWidth * config.zoom, // bug?
      y: engine.halfDrawHeight * config.zoom, // bug?
    });
    this.clearMessage.graphics.use(
      new Text({
        text: "Clear!!",
        color: Color.White,
        font: new Font({
          size: 64,
          textAlign: TextAlign.Center,
          baseAlign: BaseAlign.Middle,
        }),
      })
    );
    engine.add(this.clearMessage);
  }

  reset() {
    if (this.clearScreen) this.clearScreen.kill();
    if (this.clearMessage) this.clearMessage.kill();
  }
}
