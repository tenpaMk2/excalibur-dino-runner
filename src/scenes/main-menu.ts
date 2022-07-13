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
  onInitialize(_engine: Engine): void {
    const title = new Actor({
      x: _engine.halfDrawWidth,
      y: 100,
    });
    _engine.currentScene.add(title);
    const image = ResourceManager.getTitleSprite();
    image.scale = new Vector(2, 2);
    title.graphics.use(image);

    this.initDinos(_engine);

    this.initStage01(_engine);
    this.initStage02(_engine);

    this.initCredits(_engine);
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
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }

  initTard(engine: Engine) {
    const animation = ResourceManager.getDinoTardRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 2 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }

  initDoux(engine: Engine) {
    const animation = ResourceManager.getDinoDouxRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 3 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }

  initMort(engine: Engine) {
    const animation = ResourceManager.getDinoMortRunAnimation();
    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 4 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
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
    engine.currentScene.add(stage);
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
    engine.currentScene.add(stage02);
    stage02.graphics.use(stage02Sprite);

    stage02.on("pointerdown", (event: PointerEvent): void => {
      engine.goToScene("stage-02");
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
    engine.currentScene.add(credits);
  }
}
