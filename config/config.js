module.exports = {
  development: {
    dialect: "postgres",
    database:'presupuestos',
    username:'postgres',
    password:'52425242',
    host:'localhost',
    define: {
      charset: "utf8",
      dialectOptions: { collate: "utf8_general_ci" }
    },
    port: 5432,
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    dialect: "postgres",
    use_env_variable: "HEROKU_POSTGRESQL_COBALT_URL",
    port: 5432,
    define: {
      charset: "utf8",
      dialectOptions: { collate: "utf8_general_ci" }
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
    port: 5432,
    define: {
      charset: "utf8",
      dialectOptions: { collate: "utf8_general_ci" }
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
