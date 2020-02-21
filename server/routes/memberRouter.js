const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const User = require("../models").User;

router.post("/insert", async (req, res, next) => {
  const carnumber = req.body.number;
  const size = req.body.size;
  try {
    const result = await User.create({
      //models에 user.js를 쓰는거
      carnumber,
      size
    });
    console.log(result);
    res.json({ message: carnumber });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: true });
  });
});

module.exports = router;
