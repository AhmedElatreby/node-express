const express = require("express");
const app = express();
const path = require("path");
const route = require("./routes/api/members");

const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", route);

app.listen(PORT, () => console.log(`Server stared on port ${PORT}`));
