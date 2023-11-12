import * as PIXI from "pixi.js";
import Nietzsche from "./assets/nietzsche.png";

const HeroImage = function loadPixiImage() {
  let app;
  let player;

  app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1,
  });

  document.getElementById("root").appendChild(app.view);
  // app = document.createElement("div").appendChild(app.view);
  player - new PIXI.Sprite.from(Nietzsche);
  player.anchor.set(0.5);
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;

  app.stage.addChild(player);

  return app.view;
};

export default HeroImage;
