const express = require('express');

const Truck = require('./trucks-model.js');

const tokenRestrict = require("../auth/middleware/tokenRestrict.js");
const roleRestrict = require("../auth/middleware/roleRestrict.js");

const router = express.Router();

// Token restrict everything here, roleRestrict everything except the get /

// tokenRestrict,

// tokenRestrict
router.get('/', tokenRestrict, (req, res) => {
    Truck.find()
        .then(trucks => {
            res.status(200).json(trucks);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get trucks' });
        });
});

// tokenRestrict, roleRestrict('operator'),
router.post('/', tokenRestrict, roleRestrict('operator'), (req, res) => {
    const truckData = req.body;
    Truck.add(truckData)
        .then(truckAdded => {
            res.status(201).json(truckAdded);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to add new truck' });
        });
});

// tokenRestrict, roleRestrict('operator'),
router.put('/:id', tokenRestrict, roleRestrict('operator'), (req, res) => {
    const { id } = req.params;
    const truckData = req.body;
    Truck.findByTruckId(id)
        .then(async (foundTruck) => {
            if (foundTruck) {
                const updated = await Truck.update(id, truckData);
                const updatedIndeed = await Truck.findByTruckId(id)
                res.status(200).json(updatedIndeed)
            } else {
                res.status(404).json({ message: 'Could not find truck with given id.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to update truck' });
        });
});

// tokenRestrict, roleRestrict('operator'), 
router.delete('/:id', tokenRestrict, roleRestrict('operator'), (req, res) => {
    const { id } = req.params;
    Truck.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ message: `Deleted truck with id ${id} from database` });
            } else {
                res.status(404).json({ message: 'Could not find truck with given id' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to delete truck' });
        });
});


// ****** Truck Ratings ******
router.post("/add-rating", tokenRestrict, roleRestrict('diner'), (req, res) => {
    const ratingObj = req.body
    Truck.addRating(ratingObj)
        .then(ratingObjReturned => {
            res.status(201).json({ message: `User with id ${ratingObjReturned.user_id} successfully added
            rating of ${ratingObjReturned.rating} 
            for truck with id ${ratingObjReturned.truck_id}` })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to add truck rating' });
        });
})

router.get("/get-all-truck-ratings", tokenRestrict, (req, res) => {
    Truck.findAllTruckRatings()
        .then(ratings => {
            res.status(200).json(ratings)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get truck ratings' });
        });
})

// Id is truck id
// /:id
router.get("/get-truck-rating-avg", tokenRestrict, (req, res) => {
    Truck.findAvgTruckRatingSortByTruckId()
        .then(avgRatingReturned => {
            const toInt = avgRatingReturned.map(obj => {
                const avgAsInt = Math.round(obj.avg)
                return {...obj, avg: avgAsInt}
            });
            const withAvgRatingNotAvg = toInt.map(obj => {
                return {
                  avgRating: obj.avg,
                  truck_id: obj.truck_id
                };
            });
            res.status(200).json(withAvgRatingNotAvg)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get avg truck rating' });
        });
})

module.exports = router;
