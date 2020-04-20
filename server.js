const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require("./router/user-router.js");
const authRouter = require("./auth/auth-router.js");
const authenticator = require("./auth/authenticator.js");

const server = express();

const sessionConfig = {
    name: 'Banana',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
      maxAge: 1000 * 60 * 10, // good for 10 mins in miliseconds
      secure: process.env.USE_SECURE_COOKIES || false, // over https only, set to true in production
      httpOnly: true, // true means JS on the client cannot access the cookies
      
    }
  }

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.status(200).json({Message: "API is up and running"});
});

module.exports = server;