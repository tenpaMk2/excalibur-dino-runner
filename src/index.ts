import { DisplayMode, Engine, Loader, Physics, Vector } from "excalibur";
import config from "./config";
import { Resources } from "./resource";
import { GameScene } from "./scenes/game-scene";
import { MainMenu } from "./scenes/main-menu";
import { Stage02 } from "./scenes/stage-02";

const engine = new Engine({
  width: config.gameWidth,
  height: config.gameHeight,
  displayMode: DisplayMode.FitScreen,
  canvasElementId: "game",
});

// Physics.useRealisticPhysics();
Physics.gravity = Vector.Down.scale(config.gravity);

engine.showDebug(false);
engine.add("main-menu", new MainMenu());
engine.add("game-scene", new GameScene());
engine.add("stage-02", new Stage02());
engine.goToScene("main-menu");

const loader = new Loader();
for (const resource of Object.values(Resources)) {
  loader.addResource(resource);
}

loader.suppressPlayButton = true;

engine.start(loader);
