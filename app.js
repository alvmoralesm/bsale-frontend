const express = require("express");
const app = express();
const ExpressError = require("./utils/ExpressError");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
