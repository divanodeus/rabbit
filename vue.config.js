module.exports = {
  publicPath: "./",
  pages: {
    index: {
      entry: "src/main.js"
    },
    worker: {
      entry: "src/worker.js",
      filename: "worker.html"
    }
  },
  configureWebpack: {
    target: "electron-renderer",
    externals: {
      sequelize: "commonjs sequelize",
      sqlite3: "commonjs sqlite3"
    }
  },
  pluginOptions: {
    electronBuilder: {
      externals: ["sequelize"],
      builderOptions: {
        extraFiles: ["rabbit.db"],
        win: {
          icon: "./public/app.ico"
        }
      }
    }
  }
};
