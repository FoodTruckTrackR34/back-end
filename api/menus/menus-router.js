const express = require('express');

const Menu = require('./menus-model.js');

const tokenRestrict = require("../auth/middleware/tokenRestrict.js");
const roleRestrict = require("../auth/middleware/roleRestrict.js");

const router = express.Router();

// Token restrict everything here, roleRestrict everything except the get /

router.get('/', tokenRestrict, (req, res) => {
    Menu.find()
        .then(menus => {
            res.status(200).json(menus);
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

router.post('/', tokenRestrict, roleRestrict('operator'), (req, res) => {
    const menuData = req.body;
    Menu.add(menuData)
        .then(menuAdded => {
            res.status(201).json(menuAdded);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to add new truck' });
        });
});

router.put('/:id', tokenRestrict, roleRestrict('operator'), (req, res) => {
    const { id } = req.params;
    const menuData = req.body;
    Menu.findById(id)
        .then(foundMenu => {
            if (foundMenu) {
                return Menu.update(menuData, id);
            } else {
                res.status(404).json({ message: 'Could not find truck with given id.' })
            }
        })
        .then(updatedMenu => {
            res.status(200).json(updatedMenu);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update truck' });
        });
});

router.delete('/:id', tokenRestrict, roleRestrict('operator'), (req, res) => {
    const { id } = req.params;
    Menu.remove(id)
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
