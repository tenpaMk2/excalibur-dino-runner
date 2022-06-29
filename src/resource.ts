import { TiledMapResource } from "@excaliburjs/plugin-tiled";
import { ImageSource, Sound } from "excalibur";

const tiledMapTmx = "./sample-stage.tmx";
const dino = "./DinoSprites - vita.png";
const dinoJump = "./open_002.ogg";
const dinoLanding = "./select_006.ogg";
const dinoBlocked = "./error_004.ogg";

export const Resources = {
  tiledmap: new TiledMapResource(tiledMapTmx),
  dino: new ImageSource(dino),
  dinoJump: new Sound(dinoJump),
  dinoLanding: new Sound(dinoLanding),
  dinoBlocked: new Sound(dinoBlocked),
};
