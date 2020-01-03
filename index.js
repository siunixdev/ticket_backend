const bodyParser = require("body-parser");
const express = require("express");
require("express-group-routes");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Middleware
const authMidlleware = require("./middleware");

// Controller
const authController = require("./controller/auth");
const categoryController = require("./controller/category");
const eventController = require("./controller/event");
const userController = require("./controller/user");
const paymentController = require("./controller/payment");

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.group("/api/v1", router => {
  // AUTH
  router.post("/signup", authController.signUp);
  router.post("/sign", authController.sign);

  // CATEGORIES
  router.get("/categories", categoryController.list);
  router.get("/category/:id", categoryController.detail);
  router.post("/category/", categoryController.save);
  router.delete("/category/:id", categoryController.delete);
  router.patch("/category/:id", categoryController.update);
  router.get("/category/:id/events", categoryController.getEventList);

  // EVENT
  router.get("/events", eventController.list);
  router.get("/event/:id", eventController.detail);
  router.get("/today/events", eventController.today);
  router.get("/upcoming/events", eventController.upcoming);
  router.post("/event/", authMidlleware.auth, eventController.save);
  router.put("/event/:id", authMidlleware.auth, eventController.update);
  router.delete("/event/:id", authMidlleware.auth, eventController.delete);
  router.get("/events/search?:title", eventController.findByTitle);

  // USER
  router.get("/profile", authMidlleware.auth, userController.detail);
  router.put("/profile", authMidlleware.auth, userController.update);

  // FAVORITE
  router.post("/favorite", authMidlleware.auth, userController.addFavorite);
  router.get(
    "/profile/favorites",
    authMidlleware.auth,
    userController.favoriteList
  );

  // ORDER
  router.post("/order", authMidlleware.auth, paymentController.addOrder);
  router.get(
    "/order/pending",
    authMidlleware.auth,
    paymentController.OrderPendingList
  );

  router.get(
    "/order/pending/:id",
    authMidlleware.auth,
    paymentController.OrderPendingDetail
  );

  router.put(
    "/order/confirm",
    authMidlleware.auth,
    paymentController.OrderPendingSetConfirm
  );

  router.put(
    "/order/approved",
    authMidlleware.auth,
    paymentController.OrderPendingSetApproved
  );

  router.get(
    "/order/approved",
    authMidlleware.auth,
    paymentController.OrderApprovedList
  );
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
