module.exports = {
  development: {
    dialect: "sqlite",
    define: {
      charset: "utf8",
      dialectOptions: { collate: "utf8_general_ci" }
    },
    storage: "./db/database.sqlite3",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    dialect: "sqlite",
    storage: ":memory"
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "postgres",
    port: 5432,
    define: {
      charset: "utf8",
      dialectOptions: { collate: "utf8_general_ci" }
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
