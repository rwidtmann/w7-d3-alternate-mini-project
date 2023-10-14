const sequelize = require('../config/connection');
const { Dealership, Car } = require('../models');

const dealershipSeedData = require('./dealershipSeedData.json');
const carSeedData = require('./carSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const dealers = await Dealership.bulkCreate(dealershipSeedData);



  for (const car of carSeedData) {
    const newCar = await Car.create({
      ...car,
      // Attach a random driver ID to each car
      dealership_id: dealers[Math.floor(Math.random() * dealers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
