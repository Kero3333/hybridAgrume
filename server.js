const express = require("express");

const app = express();

const specie = require("./routes/specie");
const variety = require("./routes/variety");

app.use(express.json());

app.use("/species", specie);
app.use("/varieties", variety);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
