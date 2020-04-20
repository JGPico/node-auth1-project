const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../router/user-module.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 8;
  
  // hash the password
  const hash = bcrypt.hashSync(user.password, rounds);
  // update the user to use the hash
  user.password = hash;

  Users.add(user).then(saved => {
      res.status(201).json(saved);
  }).catch(err => {
      res.status(500).json({errorMessage: err.message})
  });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({username}).then(found => {
        if (found && bcrypt.compareSync(password, found[0].password)) {
            // if async check, check here instead of in that ^^^ if
            req.session.loggedIn = true;
            res.status(200).json({message: "Welcome"});
        } else {
          res.status(401).json({message: "You shall not pass"});
        }
    }).catch(err => {
        res.status(500).json({errorMessage: err.message})
    });
  });
  



module.exports = router;
