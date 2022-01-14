import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const signJWT = (dataObj) =>
  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
      data: dataObj,
    },
    process.env.JWT_TOKEN_SECRET
  );

export const validateJWT = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const login_user = async (req, res) => {
  const { email, password } = req.body;
  const browser = req.headers["user-agent"];

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        const userObj = {
          user: user.email,
          browser,
        };

        const token = signJWT(userObj);

        res.send({
          result: "OK",
          user: {
            name: user.name,
            avatar: user.avatar,
            token,
          },
        });
      } else res.send({ result: "Error", message: "Password is not valid!" });
    } else res.send({ result: "Error", message: "User not found!" });
  } catch (error) {
    res.send({ result: "Error", error });
  }
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err)
      res.send({ result: "Error", message: "User cannot be logged out!" });
    else {
      res.clearCookie("connect.sid", { path: "/" });
      res.send({ result: "OK", message: "Logged out!" });
    }
  });
};

export const register_user = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    const user = await User.create(
      Object.assign(
        {
          name,
          email,
          password: hashedPassword,
        },
        avatar ? { avatar } : {}
      )
    );

    res.send({ result: "OK", user: user.name });
  } catch (error) {
    res.send({ result: "Error", message: error });
  }
};

export const check_jwt = async (req, res) => {
  res.send(req.user);
};

export const check_browser = async (req, res) => {
  const { data } = req.user;
  const browser = req.headers["user-agent"];

  if (data.browser === browser) {
    res.send({
      result: "OK",
      message: "Successful browser check!",
    });
  } else res.send({ result: "Error", message: "Unauthorized browser!" });
};
