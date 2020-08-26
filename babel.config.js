module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    ['@babel/preset-typescript', {isTSX: true, allExtensions: true}]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime', {corejs: 3}
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
};
