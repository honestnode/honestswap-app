const { directories, CommonConfiguration } = require("./webpack.common");

class DevelopmentConfiguration extends CommonConfiguration {

  get configurations() {
    return {
      mode: "development",
      devtool: "source-map",
      devServer: {
        port: 10001,
        contentBase: directories.public,
        overlay: true,
        historyApiFallback: {
          verbose: true,
        },
        publicPath: "/"
      },
    };
  }
}

module.exports = (env) => {
  return new DevelopmentConfiguration(env).build();
};
