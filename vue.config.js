module.exports = {
  publicPath: "./",
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: "./public/app.ico"
        }
      }
    }
  }
};
