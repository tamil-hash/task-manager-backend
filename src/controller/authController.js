import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async (req, res, next) => {
  const { name, email,password } = req.body;

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

    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      const newUser = {
        name: user.name,
        email: user.email,
        token,
      };
      res.status(200).json(newUser);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  }
};
