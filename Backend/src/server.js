const express = require("express");
const dotenv = require("dotenv");
dotenv.config({});
const { DbConnection } = require("./DB/DB_Connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true })); // Enable CORS for all origins
app.use(bodyParser.urlencoded({ extended: true }));

//routes import
const userRoutes = require("./Routes/user.routes");
const capRoutes = require("./Routes/captain.routes");

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/captain", capRoutes);

app.listen(PORT, async () => {
  try {
    await DbConnection();
    console.log(`Server is listing on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
