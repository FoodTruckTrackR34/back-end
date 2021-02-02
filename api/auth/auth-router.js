const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const { jwtSecret } = require("../../config/secret.js")

// const Diner = require("./diners/diners-model.js");
// const Operator = require("./operators/operators-model.js");
const User = require("./users/users-model.js");

const { isValidRegistration, isValidLogin } = require("./validate-credentials.js");

// const tokenRestrict = require("./middleware/tokenRestrict.js");
// const roleRestrict = require("./middleware/roleRestrict.js");

// Remove this before deployment:
router.get("/users", (req, res) => {
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
                    res.status(200).json({ message: "Welcome", token });
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
