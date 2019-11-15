const router = require("express").Router();
const restricted = require("./authenticate-middleware.js");
const jwt = require("jsonwebtoken");
const private = require("../private/privacy.js");
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  // implement registration

  let user = req.body;
  const muddle = bcrypt.hashSync(user.password, 12);
  user.password = muddle;

  Users.register(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ Error: "The user was not registered." });
    });
});

router.post("/login", (req, res) => {
  // implement login

  let {username, password} = req.body;

  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password))
    {
      const token = getToken(user)
      const decode = jwt.verify(token, private.jwtSecret)

      res.status(200).json({
        Message: `Welcome ${user.username}!`,
        token:token
      });
    } else {
      res.status(401).json({Error: "You have entered invalid credentials."});
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

function getToken(user) {
  const payload = {
    topic: user.id,
    name: user.username,
    section: user.department
  }

  const expiration = {
    expiresIn: "30m"
  }
  return jwt.sign(payload, private.jwtSecret, expiration)
}

router.get('/users', restricted, (req, res) => {
  Users.find()
  .then(users => {
    res.json({
      loggedInUser: req.username, users
    });
  })
  .catch(err => res.send(err));
});

module.exports = router;
