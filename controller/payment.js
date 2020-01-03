const Model = require("../models");
const Category = Model.category;
const Event = Model.event;
const Favorite = Model.favorite;
const Payment = Model.payment;
const Profile = Model.profile;
const User = Model.user;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.addOrder = (req, res) => {
  let message = "";
  let user_id = req.user_id;
  let totalPrice = 0;
  let status = "Pending";

  const { event_id, quantity } = req.body;

  Event.findOne({
    where: {
      id: event_id
    }
  })
    .then(data => {
      totalPrice = quantity * data.price;
      Payment.create({
        event_id,
        creator_user_id: user_id,
        quantity,
        total_price: totalPrice,
        status
      })
        .then(() => {
          message = "success";
          res.status(200).json({ message });
        })
        .catch(error => {
          message = "Bad request";
          res.status(400).json({ message });
        });
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });

  //   Payment.findAll({
  //     attributes: {
  //       exclude: ["createdAt", "updatedAt"]
  //     },
  //     where: {
  //       creator_user_id: user_id,
  //       event_id
  //     }
  //   })
  //     .then(data => {
  //       if (!data.length) {
  //         Payment.create({
  //           event_id,
  //           creator_user_id: user_id
  //         })
  //           .then(() => {
  //             message = "success";
  //             res.status(200).json({ message });
  //           })
  //           .catch(error => {
  //             message = "Bad request";
  //             res.status(400).json({ message });
  //           });
  //       } else {
  //         message = "Has been added to order";
  //         res.status(200).json({ message });
  //       }
  //     })
  //     .catch(error => {
  //       message = "Server response error";
  //       res.status(500).json({ message });
  //     });
};

exports.OrderPendingList = (req, res) => {
  let message = "";
  let id = req.user_id;

  Payment.findAll({
    where: {
      creator_user_id: id,
      [Op.or]: [{ status: "Pending" }, { status: "Confirmed" }]
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

exports.OrderApprovedList = (req, res) => {
  let message = "";
  let id = req.user_id;
  console.log(id);

  Payment.findAll({
    where: {
      creator_user_id: id,
      status: "Approved"
    },
    attributes: {
      exclude: ["event_id", "createdAt", "updatedAt"]
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

exports.OrderPendingDetail = (req, res) => {
  let message = "";
  let id = req.params.id;

  Payment.findOne({
    where: {
      id,
      [Op.or]: [{ status: "Pending" }, { status: "Confirmed" }]
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

exports.OrderPendingSetConfirm = (req, res) => {
  let message = "";
  let { id, attachment } = req.body;

  Payment.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        Payment.update(
          {
            attachment,
            status: "Confirmed"
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

exports.OrderPendingSetApproved = (req, res) => {
  let message = "";
  let { id } = req.body;

  Payment.findAll({
    where: {
      id
    }
  })
    .then(data => {
      if (!data.length) {
        message = "No data";
        res.status(200).json({ message });
      } else {
        Payment.update(
          {
            status: "Approved"
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
