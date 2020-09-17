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
      builderOptions: {
        externals: ["sequelize"],
        extraFiles: ["rabbit.db"],
        win: {
          icon: "./public/app.ico"
        }
      }
    }
  }
};
