const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const User = require("../models").User;
const Fee = require("../models").Fee;

router.post("/find", async (req, res, next) => {
  //사용 가능한 주차장을 찾음
  try {
    const result = await User.findOne({
      //1개만 조회
      where: {
        use: 0 //사용여부가 0인 조건하에 1개를 조회한다.
      }
    });
    console.log(result.parkingnumber);
    res.json({ message: result.parkingnumber }); //조회된 데이터의 parkingnumber를 전송
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
  console.log(number);
  ////////////////////////////////////////////////////
  try {
    const result = await User.findOne({
      where: {
        parkingnumber: number
      }
    });
    var entertime = result.updated_at;
    var exitcarnumber = result.carnumber;
    var exitcarsize = result.size;
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
  var entertimeaa = entertime;
  var exitcarnumberaa = exitcarnumber;
  var exitcarsizeaa = exitcarsize;
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
    try {
      const result = await User.findOne({
        where: {
          parkingnumber: number
        }
      });
      var exittime = result.updated_at;
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
    var exittimeaa = exittime;
    const usetime = Math.ceil((exittimeaa - entertimeaa) / 60000);
    var fee = 0;
    if (exitcarsizeaa == "small") {
      fee = Number(usetime) * 100;
    } else if (exitcarsizeaa == "medium") {
      fee = Number(usetime) * 200;
    } else if (exitcarsizeaa == "big") {
      fee = Number(usetime) * 300;
    }
    console.log(usetime);
    console.log(fee);
    res.json({
      sendtime: usetime,
      sendsize: exitcarsizeaa,
      sendnumber: exitcarnumberaa,
      sendfee: fee
    });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
/////////////////////////////////////////////////////////////////
router.post("/feeupdate", async (req, res, next) => {
  const updatefee = req.body.fee;
  console.log(updatefee);
  ///////////////////
  try {
    const result = await Fee.findOne({});
    var totalfee = result.currentfee;
    console.log(totalfee);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
  console.log(typeof updatefee);
  console.log(typeof totalfee);
  var resultfee = totalfee + updatefee;
  //////////////
  console.log(typeof resultfee);
  try {
    const result = await Fee.update(
      {
        currentfee: resultfee
      },
      {
        where: { id: 1 }
      }
    );
    res.json({ message: resultfee });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/checkcheck", async (req, res, next) => {
  try {
    const result = await Fee.findOne({});
    res.json({ message: result.currentfee });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

/////////////////////////////////////////////////////////////////

module.exports = router;
