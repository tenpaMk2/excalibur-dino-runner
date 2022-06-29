import { Engine, LockCameraToActorStrategy, Scene } from "excalibur";
import { PointerEvent } from "excalibur/build/dist/Input/PointerEvent";
import { Dino } from "../objects/dino";
import { Resources } from "../resource";

export class GameScene extends Scene {
  onInitialize(_engine: Engine): void {
    Resources.tiledmap.addTiledMapToScene(this);

    const dino = new Dino(0, 200);
    _engine.add(dino);

    _engine.input.pointers.primary.on("down", (event: PointerEvent): void => {
      dino.jump();
    });

    this.camera.addStrategy(new LockCameraToActorStrategy(dino));
    this.camera.zoom = 3;
  }
}
