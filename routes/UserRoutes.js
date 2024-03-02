const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/UserSchema");
const Todo = require("../models/TodoSchema");

const SECRET_KEY = "supradeepsecretkey";
const authenticateToken = require("../middleware");

// register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).send("User already exist with same email");
    }
    if (password !== confirmpassword) {
      return res
        .status(400)
        .send("password and confirm password should be same");
    }
    const hashedPassword = bcrypt.hashSync(password);
    const hashedConfirmPassword = bcrypt.hashSync(confirmpassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmpassword: hashedConfirmPassword,
    });

    await newUser.save();
    const users = await User.find();
    return res.send("Registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).send("Invalid Credentials");
    }
    const isMatch = bcrypt.compareSync(password, exist.password);
    if (isMatch) {
      const payload = {
        user: {
          id: exist.id,
        },
      };
      jwt.sign(payload, SECRET_KEY, { expiresIn: "10m" }, (err, token) => {
        if (err) throw err;
        return res.json({ msg: "login successful", token: token });
      });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

// user todo profile route
router.get("/todos", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ user: userId });
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error in fetching todos of the user ");
  }
});

module.exports = router;
