const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// "scripts": {
//     "dev": "cross-env NODE_ENV=development nodemon ./src/index.js",
//     "start": "cross-env NODE_ENV=production node ./src/index.js",
//     "test": "mocha -w ./tests/**/*.spec.js"
//   },