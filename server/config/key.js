/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod_keys');
} else {
  module.exports = require('./dev_keys');
}
/* eslint-enable global-require */
