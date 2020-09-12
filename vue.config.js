module.exports = {
  publicPath: "./",
  configureWebpack: {
    externals: {
      sqlite3: "commonjs sqlite3"
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraFiles: ["rabbit.db"],
        win: {
          icon: "./public/app.ico"
        }
      }
    }
  }
};
