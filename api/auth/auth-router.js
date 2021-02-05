const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const { jwtSecret } = require("../../config/secret.js");
const roleRestrict = require("./middleware/roleRestrict.js");
const tokenRestrict = require("./middleware/tokenRestrict.js");

const User = require("./users/users-model.js");

const { isValidRegistration, isValidLogin } = require("./validate-credentials.js");

router.get("/users", tokenRestrict, (req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
});  

router.post("/register", (req, res) => {
    console.log(req.body)
    const credentials = req.body;
    if (isValidRegistration(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        User.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "Invalid registration credentials",
        });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValidLogin(req.body)) {
        User.findBy(username)
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = generateToken(user)
                    let decodedToken
                    jwt.verify(token, jwtSecret, (err, decoded) => {
                        if (err) {
                          res.status(401).json('invalid token')
                        } else {
                          decodedToken = decoded
                        }
                    })
                    res.status(200).json({ 
                        message: "Welcome", 
                        token, 
                        role: `${decodedToken.role}`, 
                        userData: {
                            user_id: `${user.user_id}`, 
                            username: `${user.username}`,
                            email: `${user.email}`,
                            role: `${user.role}`,
                            latitude: `${user.latitude}`,
                            longitude: `${user.longitude}`
                        }
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "Username and password are required",
        });
    }
});

// Object structured as
// { latitude: [float], longitude: [float], username: "" }
router.put("/diner-location", tokenRestrict, roleRestrict('diner'), async (req, res) => {
    const latLng = req.body;
    if (latLng.latitude && 
        latLng.longitude && 
        latLng.username &&
        typeof latLng.latitude === "number" &&
        typeof latLng.longitude === "number" &&
        typeof latLng.username === "string" &&
        latLng.latitude >= -90 &&
        latLng.latitude <= 90 &&
        latLng.longitude >= -180 &&
        latLng.longitude <= 180) {
            User.findBy(latLng.username)
                .then(async ([user]) => {
                    const updatedUser = { 
                        ...user, 
                        latitude: latLng.latitude,
                        longitude: latLng.longitude
                    }
                    if (user) {
                        await User.update(user.user_id, updatedUser)
                        const [updatedUser2] = await User.findByNoPass(latLng.username)
                        res.status(200).json(updatedUser2)
                    } else {
                        res.status(404).json({ message: 'Could not find user with given username.' })
                    }
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({ message: "Failed to update user with latitude longitude" });
                });
    } else {
        res.status(400).json({
            message: "Invalid latitude and longitude update",
        });
    }
});

function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
    }
    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
