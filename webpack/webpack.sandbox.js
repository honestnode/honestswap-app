const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { directories, BuildVariable, CommonConfiguration } = require("./webpack.common");

class TestConfiguration extends CommonConfiguration {

  get plugins() {
    return [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: directories.public,
            to: directories.dist,
            globOptions: {
              ignore: ["*.html"],
            },
          },
        ],
      }),
    ];
  }

  get configurations() {
    return {
      mode: "production",
      performance: {
        hints: "warning",
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false,
              },
              compress: {
                warnings: false,
              },
            },
          }),
        ],
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "common",
              chunks: "initial",
            },
          },
        },
      },
    };
  }
}

module.exports = (env) => {
  return new TestConfiguration(env).build();
};

module.exports.TestConfiguration = TestConfiguration;
