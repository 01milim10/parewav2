const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dashboardRoutes = require("./api/routes/dashboard.routes"),
  newsRoutes = require("./api/routes/news.routes");

const app = express();

//This helps to log the request made to the server
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

require("./server");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json()); //This helps the Express server read JSON

//use routes
app.use(dashboardRoutes);
app.use(newsRoutes);

// STARTING THE WEB SERVER
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
