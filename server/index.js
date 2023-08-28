const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const storyRoute = require("./routes/storyRoute");
const authRoute = require("./routes/authRoute");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use("/auth", authRoute);
app.use("/story", storyRoute);


app.get("/", (req, res) => {

    res.send({ success: "Hello server" });

});


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Server is running on http://localhost:3000"))
        .catch((error) => console.log(error))

});