import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { ImageSource, Sound } from "excalibur";

const stage01Tmx = "./stage-01.tmx";
const stage02Tmx = "./stage-02.tmx";
const doux = "./DinoSprites - doux.png";
const mort = "./DinoSprites - mort.png";
const tard = "./DinoSprites - tard.png";
const vita = "./DinoSprites - vita.png";
const dinoJump = "./open_002.ogg";
const dinoLanding = "./select_006.ogg";
const dinoBlocked = "./error_004.ogg";
const clear = "./confirmation_002.ogg";
const mapchip = "./tiles_packed.png";
const title = "./title.png";
const menu = "./menu.png";

export const Resources = {
  stage01Tmx: new TiledMapResource(stage01Tmx),
  stage02Tmx: new TiledMapResource(stage02Tmx),
  doux: new ImageSource(doux),
  mort: new ImageSource(mort),
  tard: new ImageSource(tard),
  vita: new ImageSource(vita),
  dinoJump: new Sound(dinoJump),
  dinoLanding: new Sound(dinoLanding),
  dinoBlocked: new Sound(dinoBlocked),
  clear: new Sound(clear),
  mapchip: new ImageSource(mapchip),
  title: new ImageSource(title),
  menu: new ImageSource(menu),
};
