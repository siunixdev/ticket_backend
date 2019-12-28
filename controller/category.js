const Model = require("../models");
const Category = Model.category;
const Event = Model.event;
const Favorite = Model.favorite;
const Payment = Model.payment;
const Profile = Model.profile;
const User = Model.user;

// GET LIST
exports.list = (req, res) => {
  let message = "";

  Category.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

// GET DETAIL
exports.detail = (req, res) => {
  let message = "";

  Category.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
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

// SAVE
exports.save = (req, res) => {
  let message = "";

  const { name } = req.body;

  Category.create({
    name
  })
    .then(data => {
      message = "Success";
      res.status(200).json({ message, data });
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

// UPDATE
exports.update = (req, res) => {
  let message = "";

  const { id } = req.params;
  const { name } = req.body;

  Category.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        Category.update(
          {
            name
          },
          {
            where: { id }
          }
        )
          .then(data => {
            message = "Success";
            res.status(200).json({ message });
          })
          .catch(error => {
            message = "Server response error";
            res.status(500).json({ message });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        massage: "Server response error!"
      });
    });
};

// DELETE
exports.delete = (req, res) => {
  let message = "";

  const { id } = req.params;

  Category.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        Category.destroy({
          where: {
            id
          }
        })
          .then(category => {
            message = "Success";
            res.status(200).json({ message });
          })
          .catch(error => {
            message = "Bad request";
            res.status(400).json({ message });
          });
      }
    })
    .catch(error => {
      res.status(500).json({
        massage: "Server response error!"
      });
    });
};

// GET EVENT LIST
exports.getEventList = (req, res) => {
  let message = "";
  const { id } = req.params;

  Event.findAll({
    attributes: {
      exclude: ["category_id", "creator_user_id", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Category,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        where: {
          id
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
