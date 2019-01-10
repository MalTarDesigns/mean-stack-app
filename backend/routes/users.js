const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

// USER SIGNUP
router.post("/signup", (req, res, next) => {
  // hash password
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(createdUser => {
        res.status(201).json({
          message: "User added successfully",
          createdUser: createdUser
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

// USER LOGIN
router.post("/login", (req, res, next) => {
  let fetchUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed!" });
      }
      fetchUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return result.status(401).json({ message: "Auth failed!" });
      }
      // JWT WEB TOKEN
      const token = jwt.sign(
        { email: fetchUser.email, userId: fetchUser._id },
        "secrect_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, expiresIn: 3600 });
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({
        error: err
      });
    });
});

// DELETE A USER
router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "User deleted!" });
  });
});

module.exports = router;
