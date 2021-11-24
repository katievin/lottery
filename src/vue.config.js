module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/lottery/'
    : '/',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'Unique Lottery';
        return args;
      });
  },
};
