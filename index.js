const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/config");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("INDEX");
});

// User Route
app.use("/user", require("./routes/user"));
// Tickets route
app.use("/tickets", require("./routes/tickets"));
// Contracts route
app.use("/contracts", require("./routes/contracts"));
// refesh token
app.use("/token", require("./routes/token"));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
