const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { SERVICE, USER, PASSWORD } = require('../constants');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4000),
    MONGODB_URL: 'mongodb+srv://food-app:*i*Nn8G.BpV2xSG@cluster0.j0dgb.mongodb.net/food-app?retryWrites=true&w=majority',
    JWT_SECRET: 'qQWu6sAVPLnJyy2pCXfaGPeAsThtG3gd',
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: `mongodb+srv://smy:MW5LsE45dV2zDkac@foa.75vbc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority${
      envVars.NODE_ENV === 'test' ? '-test' : ''
    }`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: 'qQWu6sAVPLnJyy2pCXfaGPeAsThtG3gd',
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      service: SERVICE,
      auth: {
        user: USER, // generated ethereal user
        pass: PASSWORD, // generated ethereal password
      },
    },
    from: USER,
  },
};
