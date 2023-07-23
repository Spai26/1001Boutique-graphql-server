module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@controllers': './src/controllers',
          '@routes': './src/routes',
          '@models': './src/models',
          '@graphql': './src/graphql',
          '@interfaces': './src/interfaces',
          '@middlewares': './src/middlewares',
          '@libs': './src/libs',
          '@helpers': './src/helpers',
          '@utils': './src/utils'
        }
      }
    ]
  ]
};
