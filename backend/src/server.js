import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { registerValidator } from "./validators/registerValidator.js";
import bcrypt from 'bcrypt';
import { connect, disconnect } from './db/db.js';
import { User } from './db/models/User.js';
const app = express();
app.use(cors());

function checkTokenMiddleware(req, res, next) {

  const tokenRaw = req.headers.authorization;
  if (!tokenRaw) {
    return res.sendStatus(401);
  }
  const tokenToCheck = tokenRaw.split(" ")[1];
  if (!tokenToCheck) {
    return res.sendStatus(401);
  }

  jwt.verify(tokenToCheck, process.env.JWT_SECRET, (error, payload) => {
    // console.log({ error, payload });
    if (error) {
      return res.status(400).send(error.message);
    }

    req.userData = {
      userId: payload.userId,
      email: payload.email,
      admin: payload.admin,
    };
    next();
  });
}

app.get("/register", registerValidator, async (req, res) => {
  // registration data validation?
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    res.json({ errors: result.errors.map(e => e.msg) });
    return;
  }

  // if valid then check if user already exists
  const email =  req.headers.email;
  const isRegistered = await User.findOne({email: email}).exec();

  // already registered?
  if (isRegistered) {
    res.status(401).send('Already registered.\n');
    return;
  }

  // add user to db
  const password =  req.headers.password;
  const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

  await User.create({
    email: email,
    hash: hash,
  })

  res.send(`Successfully registered ${email}. Please login.\n`);
});

// This endpoint returns a fresh token
app.get("/login", async (req, res) => {
  const email =  req.headers.email;
  const password =  req.headers.password;

  const registeredUser = await User.findOne({ email: email });
  if (!registeredUser) {
    res.status(401).send('Something with your login went wrong. [email address not found].');
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, registeredUser.hash);
  if (!isPasswordCorrect) {
    res.status(401).send('Something with your login went wrong. [password incorrect].');
    return;
  }

  const payload = {
    id: registeredUser.id,
    email: registeredUser.email,
    admin: false
  };
  const options = {
    expiresIn: process.env.EXPIRATION_TIME
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  res.send(`${email}'successfully logged in with jwt bearer token: \n` + token);

});

// This endpoint is secured; only requests with a valid token can access ot
app.get("/secure", checkTokenMiddleware, (req, res) => {
  res.send(`Hooray, ${req.userData.email}, you have access`);
});

app.listen(process.env.API_PORT, async () => {
  await connect();
  console.log("Listening on http://localhost:" + process.env.API_PORT);
});

process.on('exit', async function() {
  await disconnect();
});