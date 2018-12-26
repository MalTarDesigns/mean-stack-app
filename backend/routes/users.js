const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

// ADD A User
router.post("/signup", (req, res, next) => {
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

// UPDATE A USER
router.put("/:id", (req, res, next) => {});

// GET ALL USERS
router.get("/", (req, res, next) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

// GET A USER
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
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
