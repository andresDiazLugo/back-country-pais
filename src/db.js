require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
// const sequelize = require('sequelize');
const {
  DB_USER, DB_PASSWORD,DB_HOST,DB_NAME,DB_PORT
} = process.env;

let sequelize = new Sequelize("postgresql://postgres:XFjVhHpAc8bknKHGju9Q@containers-us-west-67.railway.app:5916/railway");


//  process.env.NODE_ENV === "production"
// ? new Sequelize({
//   database:DB_NAME,
//   dialect: "postgres",
//   host:DB_HOST,
//   port:"5432",
//   username:DB_USER,
//   password:DB_PASSWORD,
//   pool:{
//     max:3,
//     min:1,
//     idle:10000
//   },
//   dialectOptions:{
//     ssl:{
//       require:true,

//       rejectUnauthorized:false,
//     },
//     keepAlive: true,
//   },
//   ssl:true
// })
// :





// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
/* It's getting the name of the current file (db.js) */
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
/* It's getting the name of the current file (db.js) */
/* It's getting the name of the current file (db.js) */
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);//[["users","users"],["countries","countries"],["roles","roles"]]
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);//[["users","users"][]]
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const{Activity,Country,Users,Role} = sequelize.models;
console.log(sequelize.models)
// Aca vendrian las relaciones
// Product.hasMany(Reviews);


/* It's creating a table called countriXactivy with the columns countryId and activityId. */
Country.belongsToMany(Activity,{through: "countriXactivy"});
/* It's creating a table called countriXactivy with the columns countryId and activityId. */
Activity.belongsToMany(Country,{through: "countriXactivy"})

//un pais puede tener muchos usuarios 
Users.hasMany(Activity)
//un usuario pertenece a un solo pais
Activity.belongsTo(Users)

//un usuario puede tener mucho roles
Users.hasMany(Role);
//un role le pertenece a un solo usuario
Role.belongsTo(Users)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
