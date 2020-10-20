const {BuildVariable} = require('./webpack.common');
const {directories, CommonConfiguration} = require('./webpack.common');

class DevelopmentConfiguration extends CommonConfiguration {

  parseEnvironmentVariables(env) {
    return new BuildVariable({
      network: '-1',
      configurationContract: '0x397E20C3C3e7c9C2ff805ADD58710Fa9BE9207b8',
      assetManagerContract: '0x96F2c88017e71dFD83357A2F851D12411F796069',
      vaultContract: '0xff62852767B2AfdE6F082930f67924F4a23EB80d',
      ...env
    });
  }

  get configurations() {
    return {
      mode: 'development',
      devtool: 'source-map',
      devServer: {
        port: 10001,
        contentBase: directories.public,
        overlay: true,
        historyApiFallback: {
          verbose: true
        },
        publicPath: '/'
      }
    };
  }
}

module.exports = (env) => {
  return new DevelopmentConfiguration(env).build();
};
