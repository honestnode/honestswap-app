const {BuildVariable} = require('./webpack.common');
const {TestConfiguration} = require('./webpack.sandbox');

class ProductionConfiguration extends TestConfiguration {

  parseEnvironmentVariables(env) {
    return new BuildVariable({
      network: '1',
      ...env
    });
  }
}

module.exports = (env) => {
  return new ProductionConfiguration(env).build();
};
