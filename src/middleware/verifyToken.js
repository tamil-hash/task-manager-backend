import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    res.status(403).send("A token is required for authentication");
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send("Invalid Token");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

export default verifyToken;
