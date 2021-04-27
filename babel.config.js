module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    [
      '@babel/plugin-transform-runtime',
      {
        'useESModules': true,
        'corejs': 3
      }
    ]
  ]
};
