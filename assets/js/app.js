// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

import { Elm } from "../elm/Main.elm";

const $root = document.createElement("div");
document.body.appendChild($root);

const app = Elm.Main.init({
  node: $root,
});

let xCount = 0;

let data = [
  { x: 0, y: 100, z: 1 },
  { x: 1, y: 110, z: 1 },
  { x: 2, y: 120, z: 1 },
  { x: 3, y: 130, z: 1 },
  { x: 4, y: 140, z: 1 },
  { x: 5, y: 150, z: 1 },
  { x: 6, y: 160, z: 1 },
  { x: 7, y: 170, z: 1 },
  { x: 8, y: 180, z: 1 },
  { x: 9, y: 190, z: 1 },
  { x: 10, y: 200, z: 1 },
  { x: 11, y: 210, z: 1 },
  { x: 12, y: 220, z: 1 },
  { x: 13, y: 230, z: 1 },
  { x: 14, y: 240, z: 1 },
  { x: 15, y: 250, z: 1 },
  { x: 16, y: 260, z: 1 },
  { x: 17, y: 270, z: 1 },
  { x: 18, y: 280, z: 1 },
  { x: 19, y: 290, z: 1 },
  { x: 20, y: 300, z: 1 },
  { x: 21, y: 310, z: 1 },
  { x: 22, y: 320, z: 1 },
  { x: 23, y: 330, z: 1 },
  { x: 23, y: 330, z: 1 },
  { x: 22, y: 320, z: 1 },
  { x: 21, y: 310, z: 1 },
  { x: 20, y: 300, z: 1 },
  { x: 19, y: 290, z: 1 },
  { x: 18, y: 280, z: 1 },
  { x: 17, y: 270, z: 1 },
  { x: 16, y: 260, z: 1 },
  { x: 15, y: 250, z: 1 },
  { x: 14, y: 240, z: 1 },
  { x: 13, y: 230, z: 1 },
  { x: 12, y: 220, z: 1 },
  { x: 11, y: 210, z: 1 },
  { x: 10, y: 200, z: 1 },
  { x: 9, y: 190, z: 1 },
  { x: 8, y: 180, z: 1 },
  { x: 7, y: 170, z: 1 },
  { x: 6, y: 160, z: 1 },
  { x: 5, y: 150, z: 1 },
  { x: 4, y: 140, z: 1 },
  { x: 3, y: 130, z: 1 },
  { x: 2, y: 120, z: 1 },
  { x: 1, y: 110, z: 1 },
  { x: 0, y: 100, z: 1 },
];

const sendData = () => {
  setTimeout(() => {
    console.log("sending");
    if (data.length > 0) {
      const dataPoint = data[0];
      dataPoint.x = xCount;
      app.ports.getData.send(dataPoint);
      const newData = data.splice(1);
      newData.push(dataPoint);
      data = newData;
      xCount++;
      sendData();
    }
  }, 250);
};

sendData();
