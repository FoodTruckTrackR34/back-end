const express = require('express');

const Favorite = require('./favorites-model.js');
const User = require("../auth/users/users-model.js")
const Truck = require("../trucks/trucks-model.js")

const tokenRestrict = require("../auth/middleware/tokenRestrict.js");
const roleRestrict = require("../auth/middleware/roleRestrict.js");
const dbConfig = require('../../database/dbConfig.js');

const router = express.Router();

// Token restrict everything here, roleRestrict everything except the get /

router.get('/', (req, res) => {
    Favorite.find()
        .then(allFavs => {
            res.status(200).json(allFavs);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to get all users' favorite trucks" });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Favorite.findByUserId(id)
        .then(userFavs => {
            res.status(200).json(userFavs);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to get user's favorite trucks" });
        });
});

router.post('/', async (req, res) => {
    const favObj = req.body
    const existsUser = await User.findById(favObj.user_id)
    const existsTruck = await Truck.findByTruckId(favObj.truck_id)
    if (!req.body.user_id || !req.body.truck_id){
        res.status(403).json({ message: "truck favorite object must include truck_id and user_id" })
    } else if (!existsUser){
        res.status(404).json({ message: `User with id ${favObj.user_id} not found` })
    } else if (!existsTruck){
        res.status(404).json({ message: `Truck with id ${favObj.truck_id} not found` })
    } else {
        Favorite.add(favObj)
            .then(([newFav]) => {
                res.status(201).json(newFav);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Failed to post new favorite' });
            });
    }
});

module.exports = router;
