const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Service Sharing Server Running");
});

app.listen(port, () => {
  console.log(`Service Sharing on port ${port}`);
});
