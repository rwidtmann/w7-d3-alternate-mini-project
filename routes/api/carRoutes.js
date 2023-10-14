const router = require('express').Router();
const { Dealership, Car } = require('../../models');


// Retrieve all Cars
router.get('/', async (req, res) => {
  try {
    const carData = await Car.findAll();
    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieve One Car by ID
router.get('/vehical/:id', async (req, res) => {
  try {
    const carData = await Car.findByPk(req.params.id);

    if (!carData) {
      res.status(404).json({ message: 'No Car found with that id!' });
      return;
    }

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieve all Cars and included associated Dealership data
router.get('/dealer-location', async (req, res) => {
  try {
    const carData = await Car.findAll({
      include:[ {model: Dealership}]
  });
    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a Car
router.post('/', async (req, res) => {
  try {
    const carData = await Car.create(req.body);
    res.status(200).json(carData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Update a Car by ID
router.put('/update/:id', (req, res) => {
  Car.update(
    {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      dealership_id: req.body.dealership_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCar) => {
      res.json(updatedCar);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// Delete a Car by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const carData = await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!carData) {
      res.status(404).json({ message: 'No Car found with that id!' });
      return;
    }

    res.status(200).json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
