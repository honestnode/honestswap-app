const {BuildVariable} = require('./webpack.common');
const {directories, CommonConfiguration} = require('./webpack.common');

class DevelopmentConfiguration extends CommonConfiguration {

  parseEnvironmentVariables(env) {
    return new BuildVariable({
      network: '-1',
      configurationContract: '0xdbA4Ae8BB07beeB78C12a84786A98060aF01CAbF',
      assetManagerContract: '0x48033abD726378E1DcD90562B09941B56Dfc54f1',
      vaultContract: '0x973993D6f684075B98f88d4f519AFDb20d3De065',
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
