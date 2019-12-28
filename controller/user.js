const Model = require("../models");
const Category = Model.category;
const Event = Model.event;
const Favorite = Model.favorite;
const Payment = Model.payment;
const Profile = Model.profile;
const User = Model.user;

// GET DETAIL
exports.detail = (req, res) => {
  let message = "";

  User.findOne({
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"]
    },
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

// UPDATE PROFILE
exports.update = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  const { id } = req.params;

  const { name, image, no_telp } = req.body;

  User.findAll({
    where: {
      id: user_id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        userId = data[0].id;
        if (user_id === userId) {
          User.update(
            {
              name,
              image,
              no_telp
            },
            {
              where: { id: user_id }
            }
          )
            .then(data => {
              message = "Success";
              res.status(200).json({ message });
            })
            .catch(error => {
              message = "Bad request";
              res.status(400).json({ message });
            });
        } else {
          message = "Unauthorized";
          res.status(401).json({ message });
        }
      }
    })
    .catch(error => {
      message = "Server response error";

      res.status(500).json({ message });
    });
};

// ADD FAVORITE
// {
//   event_id : 1
// }
exports.addFavorite = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  const { event_id } = req.body;

  Favorite.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      creator_user_id: user_id,
      event_id
    }
  })
    .then(data => {
      if (!data.length) {
        Favorite.create({
          event_id,
          creator_user_id: user_id
        })
          .then(() => {
            message = "success";
            res.status(200).json({ message });
          })
          .catch(error => {
            message = "Bad request";
            res.status(400).json({ message });
          });
      } else {
        message = "Has been added to favorites";
        res.status(200).json({ message });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

// GET USER FAVORITE LIST
exports.favoriteList = (req, res) => {
  let message = "";
  let { id } = req.params;

  Favorite.findAll({
    where: {
      creator_user_id: id
    },
    attributes: {
      exclude: ["creator_user_id", "event_id", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Event,
        as: "event",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    ]
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = error;
      res.status(500).json({ message });
    });
};
