const Dealership = require('./Dealership');
const Car = require('./Car');


Dealership.hasMany(Car, {
  foreignKey: 'dealership_id',
  onDelete: 'CASCADE',
});

Car.belongsTo(Dealership, {
  foreignKey: 'dealership_id',
});

module.exports = { Dealership, Car };
