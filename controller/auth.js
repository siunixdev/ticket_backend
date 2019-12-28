// require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require("../models");
const Category = Model.category;
const Event = Model.event;
const Favorite = Model.favorite;
const Payment = Model.payment;
const Profile = Model.profile;
const User = Model.user;
const saltRound = 10; //process.env.SALT_ROUND;
const secretKey = "siunix"; //process.env.SECRET_KEY;

exports.signUp = (req, res) => {
  let message = "";
  const { name, email, username, password } = req.body;

  User.findAll({
    where: {
      username
    }
  })
    .then(data => {
      if (data.length > 0) {
        message = "Username has been taken";
        res.status(200).json({ message });
      } else {
        User.findAll({
          where: {
            email
          }
        })
          .then(data => {
            if (data.length > 0) {
              message = "Email has been registered";
              res.status(200).json({ message });
            } else {
              bcrypt.genSalt(saltRound, (err, salt) => {
                if (err) {
                  message = "Server response error";
                  res.status(500).json({ message });
                } else {
                  bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                      message = "Server response error";
                      res.status(500).json({ message });
                    } else {
                      User.create({
                        name: name,
                        email: email,
                        username: username,
                        password: hash
                      })
                        .then(user => {
                          if (user) {
                            message = "Success";
                            const token = jwt.sign({ id: user.id }, secretKey);
                            res.status(200).json({ message, token });
                          } else {
                            message = "Bad request";
                            res.status(400).json({ message });
                          }
                        })
                        .catch(error => {
                          message = "Server response error";
                          res.status(500).json({ message });
                        });
                    }
                  });
                }
              });
            }
          })
          .catch(error => {
            message = "Bad request";
            res.status(400).json({ message });
          });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

exports.sign = (req, res) => {
  let message = "";
  const { username, password } = req.body;

  User.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      username: username
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            message = "Bad request";
            res.status(400).json({ message });
          } else if (!isMatch) {
            message = "Password doesn't match";
            res.status(200).json({ message });
          } else {
            message = "Success";
            const token = jwt.sign({ id: user.id }, secretKey);
            res.status(200).json({ message, token });
          }
        });
      } else {
        message = "Wrong username!";
        res.status(200).json({ message });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};
