const express = require('express');

const Truck = require('./trucks-model.js');

const tokenRestrict = require("../auth/middleware/tokenRestrict.js");
const roleRestrict = require("../auth/middleware/roleRestrict.js");

const router = express.Router();

// Token restrict everything here, roleRestrict everything except the get /

// tokenRestrict,

router.get('/', (req, res) => {
    Truck.find()
        .then(trucks => {
            res.status(200).json(trucks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get schemes' });
        });
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;

//   Truck.findById(id)
//     .then(scheme => {
//       if (scheme) {
//         res.json(scheme);
//       } else {
//         res.status(404).json({ message: 'Could not find scheme with given id.' })
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Failed to get schemes' });
//     });
// });

// tokenRestrict, roleRestrict('operator'),
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const truckData = req.body;
    Truck.findById(id)
        .then(foundTruck => {
            if (foundTruck) {
                return Truck.update(id, truckData);
            } else {
                res.status(404).json({ message: 'Could not find truck with given id.' })
            }
        })
        .then(updatedTruck => {
            res.status(200).json(updatedTruck);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update truck' });
        });
});

// tokenRestrict, roleRestrict('operator'), 
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Truck.remove(id)
        .then(deleted => {
            if (deleted) {
                console.log(deleted)
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

module.exports = router;
