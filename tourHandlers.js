const Tour = require("./tourLib");

const getAllTours = (req, res) => {
    const tours=Tour.getAll()
    res.json(tours);
};

const createTour = (req, res) => {
    const { name, info, image, price } = req.body;

    const newTour=Tour.addOne(name,info,image,price);
    if (newTour) {
        res.json(newTour);
      } else {
        // Handle error (e.g., failed to create tour)
        res.status(500).json({ message: "Failed to create tour" });
      }
};

const getTourById = (req, res) => {
    const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);
  if (tour) {
      res.json(tour);
  } else {
      res.status(404).json({ message: 'Tour not found' });
  }
};

const updateTour = (req, res) => {
    
    const tourId = req.params.tourId;

  // Destructure all potential update fields
  const { name, info, image, price } = req.body;

  const updatedTour = Tour.updateOneById(tourId, { name, info, image, price }); // Pass updated data as an object

  if (updatedTour) {
    res.json(updatedTour);
  } else {
    // Handle update failure (e.g., Tour not found)
    res.status(404).json({ message: "Tour not found" });
  }
};

const deleteTour = (req, res) => {
    const tourId = req.params.tourId;

  const isDeleted = Tour.deleteOneById(tourId);

  if (isDeleted) {
    res.json({ message: "Tour deleted successfully" });
  } else {
    // Handle deletion failure (e.g., tour not found)
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};