const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {directories, BuildVariable, CommonConfiguration} = require('./webpack.common');

class TestConfiguration extends CommonConfiguration {

  parseEnvironmentVariables(env) {
    return new BuildVariable({
      network: '3',
      configurationContract: '0x397E20C3C3e7c9C2ff805ADD58710Fa9BE9207b8',
      assetManagerContract: '0x96F2c88017e71dFD83357A2F851D12411F796069',
      vaultContract: '0xff62852767B2AfdE6F082930f67924F4a23EB80d',
      ...env
    });
  }

  get plugins() {
    return [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: directories.public,
            to: directories.dist,
            globOptions: {
              ignore: ['*.html']
            }
          }
        ]
      })
    ];
  }

  get configurations() {
    return {
      mode: 'production',
      performance: {
        hints: 'warning'
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false
              },
              compress: {
                warnings: false
              }
            }
          })
        ],
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'common',
              chunks: 'initial'
            }
          }
        }
      }
    };
  }
}

module.exports = (env) => {
  return new TestConfiguration(env).build();
};

module.exports.TestConfiguration = TestConfiguration;
