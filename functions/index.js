/* eslint-disable quotes */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// Start APP
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: "*" }));

// CRUD
app.get("/hello", (req, res) => {
  res.status(200).json({message:'hello moto'});
});

app.use(require('./api/posts/posts.routes'))

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
