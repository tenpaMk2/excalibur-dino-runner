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
import { Dino } from "./dino";

export class Goal extends Trigger {
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
        engine.stop();
      },
      filter: (actor: Entity) => {
        return actor instanceof Dino;
      },
    });
  }

  emitStageClearMessage(engine: Engine) {
    const screen = new ScreenElement({
      pos: Vector.Zero,
      width: engine.drawWidth * config.zoom, // bug?
      height: engine.drawHeight * config.zoom, // bug?
      color: Color.Orange,
      anchor: Vector.Zero,
    });
    screen.graphics.opacity = 0.2;
    engine.add(screen);

    const message = new ScreenElement({
      x: engine.halfDrawWidth * config.zoom, // bug?
      y: engine.halfDrawHeight * config.zoom, // bug?
    });
    message.graphics.use(
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
    engine.add(message);
  }
}
