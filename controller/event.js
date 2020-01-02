const Model = require("../models");
const Category = Model.category;
const Event = Model.event;
const Favorite = Model.favorite;
const Payment = Model.payment;
const Profile = Model.profile;
const User = Model.user;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Helper = require("../helper/helper");

// const today = Helper.getDateToday;

// GET LIST
exports.list = (req, res) => {
  let message = "";

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

// GET DETAIL
exports.detail = (req, res) => {
  let message = "";

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
        }
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    ],
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "Data Not found";
        res.status(200).json({ message });
      } else {
        message = "Success";
        data = data[0];
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

// SAVE
exports.save = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  console.log(user_id);

  const {
    title,
    category_id,
    start_time,
    end_time,
    price,
    description,
    address,
    url_maps,
    image
  } = req.body;

  Event.create({
    title,
    category_id,
    start_time,
    end_time,
    price,
    description,
    address,
    url_maps,
    image,
    creator_user_id: user_id
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
  let user_id = req.user_id;

  const { id } = req.params;

  const {
    title,
    category_id,
    start_time,
    end_time,
    price,
    description,
    address,
    url_maps,
    image
  } = req.body;

  Event.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "Data not found";
        res.status(200).json({ message });
      } else {
        creator_user_id = data[0].creator_user_id;
        if (user_id === creator_user_id) {
          Event.update(
            {
              title,
              category_id,
              start_time,
              end_time,
              price,
              description,
              address,
              url_maps,
              image
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

// DELETE
exports.delete = (req, res) => {
  let message = "";
  let user_id = req.user_id;

  const { id } = req.params;

  Event.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "Data not found";
        res.status(200).json({ message });
      } else {
        creator_user_id = data[0].creator_user_id;
        if (user_id === creator_user_id) {
          Event.destroy({
            where: {
              id
            }
          })
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
      res.status(500).json({
        massage: "Server response error!"
      });
    });
};

exports.findByTitle = (req, res) => {
  let message = "";
  let title = req.query.title;

  console.log(title);

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
        }
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    ],
    where: {
      title: {
        [Op.substring]: title
      }
    }
  })
    .then(data => {
      if (!data.length) {
        message = "Data Not found";
        res.status(200).json({ message });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

exports.today = (req, res) => {
  let message = "";

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
        }
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    ],
    where: {
      start_time: {
        [Op.substring]: Helper.getDateToday()
      }
      // start_time: today
    }
  })
    .then(data => {
      if (!data.length) {
        message = "Data Not found";
        // data = {}
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

exports.upcoming = (req, res) => {
  let message = "";
  let date = Helper.getNextDateFromToday();

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
        }
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    ],
    where: {
      start_time: {
        [Op.gt]: date
      }
    }
  })
    .then(data => {
      if (!data.length) {
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};
