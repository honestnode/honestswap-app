const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const directories = {
  root: path.resolve(__dirname, '..'),
  source: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  public: path.resolve(__dirname, '../public')
};

class BuildVariable {
  cdn;
  puppet;

  constructor(config) {
    const {cdn, puppet} = config;
    this.cdn = cdn;
    this.puppet = puppet;
  }
}

class CommonConfiguration {

  variables;

  constructor(env) {
    this.variables = this.parseEnvironmentVariables(env);
    if (!this.variables || !(this.variables instanceof BuildVariable)) {
      throw new Error('parseEnvironmentVariables should return an instance of BuildVariable');
    }
  }

  parseEnvironmentVariables(env) {
    return new BuildVariable({...env});
  }

  get plugins() {
    return [];
  }

  get configurations() {
    return {};
  }

  build() {
    return {
      entry: {
        app: path.resolve(directories.source, 'index.tsx'),
        vendor: ['react', 'react-dom', 'react-router-dom']
      },
      output: {
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
        publicPath: this.variables.cdn ? this.variables.cdn : '/',
        path: directories.dist,
        libraryTarget: 'umd'
      },
      module: {
        rules: [
          {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      },
      target: 'web',
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(directories.public, 'index.html')
        }),
        new webpack.DefinePlugin({
          ENV_PUPPET: JSON.stringify(this.variables.puppet)
        }),
        ...this.plugins
      ],
      ...this.configurations
    };
  }
}

module.exports.directories = directories;
module.exports.BuildVariable = BuildVariable;
module.exports.CommonConfiguration = CommonConfiguration;