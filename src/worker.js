const { ipcRenderer } = require("electron");
const { importXLXS, exportXLSX } = require("./plugins/worker");

ipcRenderer.on("import", (event, arg) => {
  importXLXS(arg);
});

ipcRenderer.on("export", (event, arg) => {
  exportXLSX(arg);
});

(() => {
  console.log("worker renderer ready!");
})();
