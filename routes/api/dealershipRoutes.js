const router = require('express').Router();
const { Dealership, Car } = require('../../models');


//  Retrieve all Dealerships
router.get('/', async (req, res) => {
  try {
    const dealershipData = await Dealership.findAll();
    res.status(200).json(dealershipData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Retrieve One Dealership by ID
router.get('/location/:id', async (req, res) => {
  try {
    const dealershipData = await Dealership.findByPk(req.params.id);

    if (!dealershipData) {
      res.status(404).json({ message: 'No dealership found with that id!' });
      return;
    }

    res.status(200).json(dealershipData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Retrieve all Dealerships and included Cars associated with that Dealership
router.get('/cars-in-stock', async (req, res) => {
  try {
    const dealershipData = await Dealership.findAll({
      include: [{ model: Car }],
    });
    res.status(200).json(dealershipData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create a Dealership
router.post('/', async (req, res) => {
  try {
    const dealershipData = await Dealership.create(req.body);
    res.status(200).json(dealershipData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Update a Dealership by ID
router.put('/update/:id', (req, res) => {
  Dealership.update(
    {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedDealership) => {
      res.json(updatedDealership);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// Delete a Dealership by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const dealershipData = await Dealership.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dealershipData) {
      res.status(404).json({ message: 'No Dealership found with that id!' });
      return;
    }
    res.status(200).json(dealershipData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
