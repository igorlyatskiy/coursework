export default () => ({
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    sync: !!process.env.DB_SYNC,
  },
  logger: {
    debug: !!process.env.DEBUG,
  },
  app: {
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 8080,
    admins: JSON.parse(process.env.APP_ADMINS),
    isDev: process.env.NODE_ENV === 'development',
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackUrl: 'http://localhost:8080/auth/google/callback',
    },
    jwt: {
      secret: process.env.JWT_SECRET_KEY,
      exp: parseInt(process.env.JWT_EXP_TIME),
      cookieName: 'JWT_TOKEN',
    },
  },
});
