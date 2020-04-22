const configDev = {
    "type": "postgres",
    "host": "127.0.0.1",
    "port": 5432,
    "username": "postgres",
    "password": "Fsoft@12345",
    "database": "postgres",
    "synchronize": true,
    "logging": false,
    "entities": ["src/api/entity/**/*.ts"],
    "migrations": ["src/api/migration/**/*.ts"],
    "subscribers": ["src/api/subscriber/**/*.ts"],
    "cli": {
        "entitiesDir": "src/api/entity",
        "migrationsDir": "src/api/migration",
        "subscribersDir": "src/api/subscriber"
    }
};

const configTest = {
    "type": "postgres",
    "host": "127.0.0.1",
    "port": 5432,
    "username": "postgres",
    "password": "12345678",
    "database": "postgres",
    "synchronize": false,
    "logging": false,
    "entities": ["dist/api/entity/**/*.js"],
    "migrations": ["dist/api/migration/**/*.js"],
    "subscribers": ["dist/api/subscriber/**/*.js"],
    "cli": {
        "entitiesDir": "dist/api/entity",
        "migrationsDir": "dist/api/migration",
        "subscribersDir": "dist/api/subscriber"
    }
}

const configProd = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": false,
    "logging": false,
    "entities": ["dist/api/entity/**/*.js"],
    "migrations": ["dist/api/migration/**/*.js"],
    "subscribers": ["dist/api/subscriber/**/*.js"],
    "cli": {
        "entitiesDir": "dist/api/entity",
        "migrationsDir": "dist/api/migration",
        "subscribersDir": "dist/api/subscriber"
    }
}

const env = process.env.NODE_ENV;
console.log('Current environment: ', env);

// dev | test | prod
switch (env) {
    case "dev":
        module.exports = configDev;
        break;
    case "test":
        module.exports = configTest;
        break;
    case "prod":
        module.exports = configProd;
        break;
}
