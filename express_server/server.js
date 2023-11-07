// Basic express server

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root")); // serving the static html index.js file

/* CURRENT ENDPOINTS 'local_state' or 'queries' */
app.use("/local_state", require("./routes/local_state"));
app.use("/dialogpt", require("./routes/dialogpt"));
app.use("/mistralai", require("./routes/mistralai"));
app.use("/fb_blender", require("./routes/fb_blender"));
app.use("/zephyr", require("./routes/zephyr"));

// Catch all for page request errors
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "Peugeot404.jpg"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
