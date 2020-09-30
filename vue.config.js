const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
module.exports = {
  publicPath: "./",
  configureWebpack: {
    externals: {
      sequelize: "commonjs sequelize",
      sqlite3: "commonjs sqlite3"
    },
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ["es-us", "zh-cn"]
      })
    ]
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
