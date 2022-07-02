import {
  Actor,
  Animation,
  BaseAlign,
  Color,
  Engine,
  Font,
  Scene,
  Sprite,
  SpriteSheet,
  Text,
  TextAlign,
  Vector,
} from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { Resources } from "../resource";

export class MainMenu extends Scene {
  onInitialize(_engine: Engine): void {
    const title = new Actor({
      x: _engine.halfDrawWidth,
      y: 100,
    });
    _engine.currentScene.add(title);
    const image = new Sprite({
      image: Resources.title,
    });
    image.scale = new Vector(2, 2);
    title.graphics.use(image);

    this.initDinos(_engine);

    const stage01Text = new Text({
      text: "Stage-01",
      color: Color.White,
      font: new Font({
        size: 32,
        textAlign: TextAlign.Left,
        baseAlign: BaseAlign.Top,
      }),
    });

    const stage01 = new Actor({
      x: _engine.halfDrawWidth,
      y: 300,
      width: stage01Text.width,
      height: stage01Text.height,
      anchor: new Vector(0.5, 0.5),
    });
    _engine.add(stage01);
    stage01.graphics.use(stage01Text);
    stage01.on("pointerdown", (event: PointerEvent): void => {
      _engine.goToScene("stage-01");
    });

    const stage02Text = new Text({
      text: "Stage-02",
      color: Color.White,
      font: new Font({
        size: 32,
        textAlign: TextAlign.Left,
        baseAlign: BaseAlign.Top,
      }),
    });

    const stage02 = new Actor({
      x: _engine.halfDrawWidth,
      y: 350,
      width: stage02Text.width,
      height: stage02Text.height,
      anchor: new Vector(0.5, 0.5),
    });
    _engine.add(stage02);
    stage02.graphics.use(stage02Text);
    stage02.on("pointerdown", (event: PointerEvent): void => {
      _engine.goToScene("stage-02");
    });
  }

  initDinos(engine: Engine) {
    this.initVita(engine);
    this.initTard(engine);
    this.initDoux(engine);
    this.initMort(engine);
  }

  initVita(engine: Engine) {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.vita,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });

    const animation = new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(4, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(5, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(6, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(7, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(8, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(9, 0)!,
          duration: 100,
        },
      ],
    });

    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 1 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }

  initTard(engine: Engine) {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.tard,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });

    const animation = new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(4, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(5, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(6, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(7, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(8, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(9, 0)!,
          duration: 100,
        },
      ],
    });

    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 2 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }

  initDoux(engine: Engine) {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.doux,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });

    const animation = new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(4, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(5, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(6, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(7, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(8, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(9, 0)!,
          duration: 100,
        },
      ],
    });

    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 3 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }

  initMort(engine: Engine) {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.mort,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });

    const animation = new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(4, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(5, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(6, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(7, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(8, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(9, 0)!,
          duration: 100,
        },
      ],
    });

    animation.scale = new Vector(4, 4);

    const dino = new Actor({
      x: 82 * 4 + 16,
      y: 200,
    });
    engine.currentScene.add(dino);
    dino.graphics.use(animation);
  }
}
