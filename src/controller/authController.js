import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!(email && password && name)) {
    res.status(400).send("All input is required");
  } else {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      res.status(201).json(user);
    }
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All input is required");
  } else {
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      const refreshToken = jwt.sign(
        { user_id: user._id, email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      const newUser = {
        name: user.name,
        email: user.email,
        token,
        id: user._id,
        refreshToken
      };

      return res.status(200).json(newUser);
    } else {
      res.status(406).send("Invalid Credentials");
    }
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.body?.refreshToken;
  if (refreshToken) {

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          console.log(decoded)
          let user = await User.findOne({ email: decoded.email.toLowerCase() });

            const token = jwt.sign(
              { user_id: user._id, email:user.email },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "1d",
              }
            );

            const refreshToken = jwt.sign(
              { user_id: user._id, email:user.email },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );

            const newUser = {
              name: user.name,
              email: user.email,
              token,
              id: user._id,
              refreshToken
            };

            return res.status(200).json(newUser);
        }
      }
    );
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
};
