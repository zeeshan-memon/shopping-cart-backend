require("dotenv").config({ path: `./env/.env.${process.env.NODE_ENV}` });
const express = require("express");
const app = express();
const server = require("http").Server(app);
require("./configs/mongoose");
require("./configs/express")(app);
const router = express.Router();
app.use("/api/v1", router);
require("./routes/index")(router);
app.get("/working", (req, res) => {
  return res.status(200).send("Working!!");
});

server.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
