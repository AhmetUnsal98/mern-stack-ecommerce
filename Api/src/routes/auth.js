import Users from "../db/users";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nanoid from "../utils/nanoid";
export default (router) => {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (user === null) {
      console.log("User not found");
    }
    const passwordConfirmed = await bcrypt.compare(password, user.password);

    if (passwordConfirmed) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      const { password, ...others } = user._doc;
      res.json({
        ...others,
        accessToken,
      });
    } else {
      console.log("Wrong password");
    }
  });

  router.post("/login/guest", async (req, res) => {
    const id = nanoid();
    const name = `guest - ${id}`;
    const surname = `guest - ${id}`;
    const email = req.body.email;
    const user = {
      avatarColor: "green",
      avartarUrl: "https://i.pravatar.cc/300",
      cardUserKey: "",
      email: email,

      identityNumber: "000000000000",
      ip: "85.34.78.112",
      locale: "tr",
      name: name,
      surname: surname,
      uid: id,
      _id: id,
      role: "guest",
    };
    if (user) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      const { uid, ...others } = user;
      res.json({
        ...others,
        accessToken,
      });
    } else {
      console.log("User not found");
    }
  });

  router.post("/register", async (req, res) => {
    const newUser = new Users({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
      console.log(savedUser);
    } catch (error) {
      console.log(error);
    }
  });
};
