const markdown = require('markdown-js');
const htmlToText = require('html-to-text');
const menubar = require("menubar");
const {ipcMain} = require("electron");
const getRandomRecipe = require("./lib/get-recipe");
const mb = menubar({showDockIcon: true, width: 800, height: 800, tooltip: "Mountains, Please!", windowPosition: "center"});



mb.on("ready", () => {
  console.log("ready!");
  // not clear how to open on application start
  //mb.createWindow();
  });

// for debugging later
// mb.on("after-create-window", () => {
//   mb.window.openDevTools();
// });


ipcMain.on("get-recipe", (event, arg) => {
  getRandomRecipe()
    .then(text => event.sender.send("recipe", text))
    .catch(err => {
      console.log(err);
      event.sender.send("recipe", `Oops, there was an error: ${err}`);
    });
});


