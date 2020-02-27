const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const User = require("../models").User;

router.post("/find", async (req, res, next) => {
  const carnumber = req.body.number;
  const size = req.body.size;
  try {
    const result = await User.findOne({
      where: {
        use: 0
      }
    });
    console.log(result.parkingnumber);
    res.json({ message: result.parkingnumber });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res, next) => {
  const carnumber = req.body.send_param.number;
  const size = req.body.send_param.size;
  const spacenumber = req.body.changenumber;
  console.log(carnumber);
  console.log(size);
  console.log(spacenumber);
  try {
    const result = await User.update(
      {
        carnumber: carnumber,
        size: size,
        use: 1,
        updated_at: Date.now()
      },
      {
        where: { id: spacenumber }
      }
    );

    console.log(carnumber);
    res.json({ message: carnumber });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/findall", async (req, res, next) => {
  try {
    const result = await User.findAll({});
    //console.log(result);
    res.json({ message: result });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/out", async (req, res, next) => {
  const number = req.body.number;
  const starttime = req.body.starttime;
  console.log(number);
  console.log(starttime);
  try {
    const result = await User.update(
      {
        carnumber: null,
        size: "",
        use: 0,
        updated_at: Date.now()
      },
      {
        where: { parkingnumber: number }
      }
    );
    /* console.log(result);
    console.log(result.updated_at); */
    //const timeend = Number(Date.now());
    //const timestart = Number(starttime);
    //const timerr = Date.now() - starttime;
    //console.log(Date.now());
    //console.log(timestart);
    res.json({ message: number });
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
