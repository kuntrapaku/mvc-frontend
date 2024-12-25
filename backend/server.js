const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
console.log("MongoDB URI:", process.env.MONGO_URI);  // Add this line for debugging
connectDB();


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


