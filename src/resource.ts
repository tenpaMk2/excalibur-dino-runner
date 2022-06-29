import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { ImageSource, Sound } from "excalibur";

const mapchipPng = "./roguelikeSheet_transparent.png";
const tiledMapTmx = "./sample-stage.tmx";
const dino = "./DinoSprites - vita.png";
const dinoJump = "./open_002.ogg";
const dinoLanding = "./select_006.ogg";

export const Resources = {
  mapchip: new ImageSource(mapchipPng),
  tiledmap: new TiledMapResource(tiledMapTmx),
  dino: new ImageSource(dino),
  dinoJump: new Sound(dinoJump),
  dinoLanding: new Sound(dinoLanding),
};
