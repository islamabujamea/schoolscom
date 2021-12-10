var _Environments = {
  DEVELOPMENT: {
    DOMAIN: 'https://ekard-api-uat.azurewebsites.net/',
    APP_NAME: 'eKard',
  },
  PRODUCTION: {
    DOMAIN: '',
    APP_NAME: '',
  },
};

module.exports = _Environments['DEVELOPMENT'];
