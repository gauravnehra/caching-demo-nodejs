const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use("/", require("./routes/route"));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started...", server.address().port);
});
