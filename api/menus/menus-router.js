const express = require('express');

const Menu = require('./menus-model.js');

const tokenRestrict = require("../auth/middleware/tokenRestrict.js");
const roleRestrict = require("../auth/middleware/roleRestrict.js");

const router = express.Router();

router.get('/', (req, res) => {
    Menu.find()
        .then(menus => {
            res.status(200).json(menus);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get menus' });
        });
});

// id is TRUCK id
router.get('/:id', (req, res) => {
    const { id } = req.params
    Menu.findByTruckId(id)
        .then(menu => {
            res.status(200).json(menu);
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to get menu of truck with id ${id}` });
        });
});

// id is TRUCK id
// tokenRestrict, roleRestrict('operator'),
router.post('/:id', (req, res) => {
    const truck_id = req.params.id;
    const menuData = req.body;
    Menu.add(menuData, truck_id)
        .then(([menuItemAdded]) => {
            res.status(201).json(menuItemAdded);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to add new menu item' });
        });
});

// router.put('/:id', tokenRestrict, roleRestrict('operator'), (req, res) => {
//     const { id } = req.params;
//     const menuData = req.body;
//     Menu.findById(id)
//         .then(foundMenu => {
//             if (foundMenu) {
//                 return Menu.update(menuData, id);
//             } else {
//                 res.status(404).json({ message: 'Could not find truck with given id.' })
//             }
//         })
//         .then(updatedMenu => {
//             res.status(200).json(updatedMenu);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to update truck' });
//         });
// });

// router.delete('/:id', tokenRestrict, roleRestrict('operator'), (req, res) => {
//     const { id } = req.params;
//     Menu.remove(id)
//         .then(deleted => {
//             if (deleted) {
//                 console.log(deleted)
//                 res.status(200).json({ message: `Deleted truck with id ${id} from database` });
//             } else {
//                 res.status(404).json({ message: 'Could not find truck with given id' });
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ message: 'Failed to delete truck' });
//         });
// });

module.exports = router;
