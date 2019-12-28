const jwt = require("jsonwebtoken");
const secretKey = "siunix"; //process.env.SECRET_KEY;

exports.auth = (req, res, next) => {
  let message = "";
  // get header
  const authHeader = req.headers["authorization"];

  // ambil token dengan lakukan split bearer dan token, lalu kita ambil tokennya di index ke 1,
  // lalu kita perlu pengkodisian, jika headernya tidak ada maka akan mengembalikan  null dan mengkonfirmasi nah unathorized
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    message = "Unauthorized";
    res.status(401).json({ message });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      message = "Your token no longer valid";
      return res.status(403).json({ message });
    }

    req.user_id = user.id;
    next();
  });
};
