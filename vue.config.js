
// const autoprefixer = require('autoprefixer');
// const pxtoviewport = require('postcss-px-to-viewport');
let isProd = process.env.NODE_ENV === 'production';
let publicPath = '/';
let configObj = {
  publicPath: publicPath, // !设置 process.env.BASE_URL的值
  // configureWebpack: {
  //   devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'cheap-source-map'
  // },
  configureWebpack: config => { // !这里的config相当于配置好的baseConfig
    if (isProd) {
      // 生产环境
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     asset: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: productionGzipExtensions,
      //     threshold: 10240, // 10240  = 10kb
      //     minRatio: 0.8
      //   })
      // );
      config.devtool = 'cheap-source-map';
      // config.module.rules.push({
      //   test: /\.(js|css|vue)$/,
      //   loader: 'webpack-replace-loader',
      //   options: {
      //     arr: [
      //       { search: '/img', replace: `${publicPath}/img`, attr: 'g' }
      //     ]
      //   }
      // });
    } else {
      // 开发环境
      config.devtool = 'source-map';
    }
  },
  lintOnSave: false, // !关闭webpack的eslint提示
  devServer: {
    overlay: { // !关闭webpack的eslint提示
      warnings: false,
      errors: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        prependData: `@import "~@/styles/variables.scss";` // !当前sass-loader为"version": "8.0.2"，所以用prependData属性，否则用additionalData
      },
      postcss: {
        plugins: [
          require('autoprefixer')({
            browsers: ['last 5 versions']
          }),
          require('postcss-px-to-viewport')({
            viewportWidth: 375, // 视口宽度（数字)
            viewportHeight: 1334, // 视口高度（数字）
            unitPrecision: 3, // 设置的保留小数位数（数字）
            viewportUnit: 'vw', // 设置要转换的单位（字符串）
            selectorBlackList: ['.ignore', '.hairlines'], // 不需要进行转换的类名（数组）
            minPixelValue: 1, // 设置要替换的最小像素值（数字）
            mediaQuery: false // 允许在媒体查询中转换px（true/false）
          })
        ]
      }
    }
  },
  chainWebpack: (config) => { // ! 主要作用 更细粒度的控制某些已经配置过的loader的内部配置
    config.plugins.delete('prefetch'); // !删除预加载，变成懒加载  优化首屏加载 还可以用 SplitChunksPlugin
    /* 添加分析工具 */
    // if (process.env.NODE_ENV === 'production') {
    //   if (process.env.npm_config_report) { // !npm run build --report执行
    //     config
    //       .plugin('webpack-bundle-analyzer')
    //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) // !其实这一串更适合写在configureWebpack里，其实觉得chainWebpack有点乱
    //       .end();
    //   }
    // }
    config
      .plugin('html')
      .tap(args => {
        console.log(args);
        args[0].title = '医生注册'; // !源码：title: api.service.pkg.name   默认取的是package.json的name
        return args;
      });

    // config.resolve.alias
    //   .set('vue', 'vue/dist/vue.esm.js');
  }
};
module.exports = configObj;
