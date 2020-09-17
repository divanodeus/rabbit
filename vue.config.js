module.exports = {
  publicPath: "./",
  configureWebpack: {
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
