const path = require('path');
module.exports = {
  watch: true,
  mode: 'production', // we have this as production because extensions don't allow `eval()`
  entry: {
      robotears_menu: ['./src/popup/robotears_menu.js'],
      robotears_options: ['./src/options/robotears_options.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false
  }
};
