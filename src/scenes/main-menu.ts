import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Font,
  Scene,
  ScreenElement,
  Text,
  Vector,
} from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { ResourceManager } from "../objects/resource-manager";
import { Resources } from "../resource";

export class MainMenu extends Scene {
  onInitialize(engine: Engine): void {
    const title = new Actor({
      x: engine.halfDrawWidth,
      y: 100,
    });
    engine.add(title);
    const image = ResourceManager.getTitleSprite();
    image.scale = new Vector(2, 2);
    title.graphics.use(image);

    this.initDinos(engine);

    this.initStage01(engine);
    this.initStage02(engine);
    this.initStage03(engine);

    this.initCredits(engine);
  }

  initDinos(engine: Engine) {
    this.initVita(engine);
    this.initTard(engine);
    this.initDoux(engine);
    this.initMort(engine);
  }

  initVita(engine: Engine) {
    const animation = ResourceManager.getDinoVitaRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 1 + 16,
      y: 200,
    });
    engine.add(dino);
    dino.graphics.use(animation);
  }

  initTard(engine: Engine) {
    const animation = ResourceManager.getDinoTardRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 2 + 16,
      y: 200,
    });
    engine.add(dino);
    dino.graphics.use(animation);
  }

  initDoux(engine: Engine) {
    const animation = ResourceManager.getDinoDouxRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 3 + 16,
      y: 200,
    });
    engine.add(dino);
    dino.graphics.use(animation);
  }

  initMort(engine: Engine) {
    const animation = ResourceManager.getDinoMortRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 4 + 16,
      y: 200,
    });
    engine.add(dino);
    dino.graphics.use(animation);
  }

  initStage01(engine: Engine) {
    const sprite = Resources.stage01.toSprite();
    const stage = new Actor({
      x: engine.halfDrawWidth,
      y: 300,
      width: sprite.width,
      height: sprite.height,
      collisionType: CollisionType.PreventCollision,
    });
    engine.add(stage);
    stage.graphics.use(sprite);

    stage.on("pointerdown", (event: PointerEvent): void => {
      engine.goToScene("stage-01");
    });
  }

  initStage02(engine: Engine) {
    const stage02Sprite = Resources.stage02.toSprite();
    const stage02 = new Actor({
      x: engine.halfDrawWidth,
      y: 350,
      width: stage02Sprite.width,
      height: stage02Sprite.height,
      collisionType: CollisionType.PreventCollision,
    });
    engine.add(stage02);
    stage02.graphics.use(stage02Sprite);

    stage02.on("pointerdown", (event: PointerEvent): void => {
      engine.goToScene("stage-02");
    });
  }

  initStage03(engine: Engine) {
    const stage03Sprite = Resources.stage03.toSprite();
    const stage03 = new Actor({
      x: engine.halfDrawWidth,
      y: 400,
      width: stage03Sprite.width,
      height: stage03Sprite.height,
      collisionType: CollisionType.PreventCollision,
    });
    engine.add(stage03);
    stage03.graphics.use(stage03Sprite);

    stage03.on("pointerdown", (event: PointerEvent): void => {
      engine.goToScene("stage-03");
    });
  }

  initCredits(engine: Engine) {
    const credits = new ScreenElement({
      x: 0,
      y: engine.drawHeight - 10,
    });
    credits.graphics.use(
      new Text({
        text: "<Credits> dino graphic: @ArksDigital, mapchip & font & sound: kenney.nl",
        color: Color.White,
        font: new Font({
          size: 24,
        }),
      })
    );
    engine.add(credits);
  }
}
