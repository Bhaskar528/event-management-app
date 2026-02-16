const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on 5000"));