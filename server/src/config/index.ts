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
  },
});