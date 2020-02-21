const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const memberRouter = require("./routes/memberRouter");
const sequelize = require("./models").sequelize;

sequelize.sync();

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "mincheolkim",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/member", memberRouter);
//app.use("/post", require("./routes/postRouter"));

app.listen(8080, () => {
  console.log("8080 sever connected");
});
