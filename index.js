const bodyParser = require("body-parser");
const express = require("express");
require("express-group-routes");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello express!");
});

app.group("/api/v1", router => {
  router.get("/", (req, res) => {
    res.send("Success Listening");
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
