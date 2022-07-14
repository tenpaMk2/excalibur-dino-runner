import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { ImageSource, Sound } from "excalibur";

export const Resources = {
  stage01Tmx: new TiledMapResource("./stage-01.tmx"),
  stage02Tmx: new TiledMapResource("./stage-02.tmx"),
  stage03Tmx: new TiledMapResource("./stage-03.tmx"),
  doux: new ImageSource("./DinoSprites - doux.png"),
  mort: new ImageSource("./DinoSprites - mort.png"),
  tard: new ImageSource("./DinoSprites - tard.png"),
  vita: new ImageSource("./DinoSprites - vita.png"),
  dinoJumpSound: new Sound("./open_002.ogg"),
  dinoLandingSound: new Sound("./select_006.ogg"),
  dinoBlockedSound: new Sound("./error_004.ogg"),
  dinoSlashedSound: new Sound("./minimize_005.ogg"),
  clearSound: new Sound("./confirmation_002.ogg"),
  mapchip: new ImageSource("./tiles_packed.png"),
  title: new ImageSource("./title.png"),
  menu: new ImageSource("./menu.png"),
  failed: new ImageSource("./Failed.png"),
  clear: new ImageSource("./clear.png"),
  reset: new ImageSource("./Reset.png"),
  stage01: new ImageSource("./Stage-01.png"),
  stage02: new ImageSource("./Stage-02.png"),
  stage03: new ImageSource("./Stage-03.png"),
  stage04: new ImageSource("./Stage-04.png"),
};
