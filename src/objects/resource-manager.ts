import { Actor, Animation, Sprite, SpriteSheet } from "excalibur";
import { Resources } from "../resource";

export class ResourceManager extends Actor {
  static getDinoDouxSpriteSheet() {
    return SpriteSheet.fromImageSource({
      image: Resources.doux,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });
  }

  static getDinoDouxRunAnimation() {
    const spriteSheet = ResourceManager.getDinoDouxSpriteSheet();
    return new Animation({
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
  }

  static getDinoDouxCryAnimation() {
    const spriteSheet = ResourceManager.getDinoDouxSpriteSheet();
    return new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(14, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(15, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(16, 0)!,
          duration: 100,
        },
      ],
    });
  }

  static getDinoMortSpriteSheet() {
    return SpriteSheet.fromImageSource({
      image: Resources.mort,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });
  }

  static getDinoMortRunAnimation() {
    const spriteSheet = ResourceManager.getDinoMortSpriteSheet();
    return new Animation({
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
  }

  static getDinoMortCryAnimation() {
    const spriteSheet = ResourceManager.getDinoMortSpriteSheet();
    return new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(14, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(15, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(16, 0)!,
          duration: 100,
        },
      ],
    });
  }

  static getDinoTardSpriteSheet() {
    return SpriteSheet.fromImageSource({
      image: Resources.tard,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });
  }

  static getDinoTardRunAnimation() {
    const spriteSheet = ResourceManager.getDinoTardSpriteSheet();
    return new Animation({
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
  }

  static getDinoTardCryAnimation() {
    const spriteSheet = ResourceManager.getDinoTardSpriteSheet();
    return new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(14, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(15, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(16, 0)!,
          duration: 100,
        },
      ],
    });
  }

  static getDinoVitaSpriteSheet() {
    return SpriteSheet.fromImageSource({
      image: Resources.vita,
      grid: {
        rows: 1,
        columns: 24,
        spriteHeight: 24,
        spriteWidth: 24,
      },
    });
  }

  static getDinoVitaRunAnimation() {
    const spriteSheet = ResourceManager.getDinoVitaSpriteSheet();
    return new Animation({
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
  }

  static getDinoVitaCryAnimation() {
    const spriteSheet = ResourceManager.getDinoVitaSpriteSheet();
    return new Animation({
      frames: [
        {
          graphic: spriteSheet.getSprite(14, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(15, 0)!,
          duration: 100,
        },
        {
          graphic: spriteSheet.getSprite(16, 0)!,
          duration: 100,
        },
      ],
    });
  }

  static getTitleSprite() {
    return new Sprite({
      image: Resources.title,
    });
  }

  static getMapchipSpriteSheet() {
    return SpriteSheet.fromImageSource({
      image: Resources.mapchip,
      grid: {
        rows: 9,
        columns: 20,
        spriteHeight: 18,
        spriteWidth: 18,
      },
    });
  }

  static getReaperSprite() {
    return ResourceManager.getMapchipSpriteSheet().getSprite(8, 3)!;
  }

  static getUpStretchedSpringSprite() {
    return ResourceManager.getMapchipSpriteSheet().getSprite(7, 5)!;
  }

  static getUpOutstretchedSpringSprite() {
    return ResourceManager.getMapchipSpriteSheet().getSprite(8, 5)!;
  }
}
