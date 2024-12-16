const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const bcrypt = require("bcrypt");
const { models } = require("./sequelize");

const saltRounds = 10;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use(
//  cors({
//    origin: "*",
//  })
//);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/healthcheck", async (req, res) => {
  res.send("Health Check");
});

app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await models.user.findOne({
      where: {
        id,
      },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).send("Login Success");
    } else {
      res.status(401).send("Login Fail");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register", async (req, res) => {
  const { id, password, name, email } = req.body;
  const hash = bcrypt.hashSync(password, saltRounds);
  try {
    const user = await models.user.findOne({
      where: {
        id,
      },
    });

    if (user) {
      return res.status(409).send("User already exists");
    }
    await models.user.create({
      id,
      password: hash,
      name,
      email,
    });
    res.send("Register Success");
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
