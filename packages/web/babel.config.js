
module.exports = {
  presets: ['@babel/preset-react', '@babel/typescript'],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    es: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
      plugins: ['babel-plugin-jsx-remove-data-test-id'],
    },
    cjs: {
      presets: [['@babel/preset-env']],
      plugins: ['babel-plugin-jsx-remove-data-test-id'],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
}
