const {TestConfiguration} = require('./webpack.test');

class ProductionConfiguration extends TestConfiguration {

}

module.exports = (env) => {
  return new ProductionConfiguration(env).build();
};
