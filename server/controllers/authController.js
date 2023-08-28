const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.send({
                status: "Fail",
                message: " User already exists",
            });
        }

        if (username && password) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({
                username,
                password: encryptedPassword,
            });

            const jwtToken = jwt.sign(
                { username, password: encryptedPassword },
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            return res.send({

                status: "Pass",
                message: "User Registered successfully",
                userid: user._id,
                username: user.username,
                token: jwtToken,
            });
        } else {
            res.send({
                status: "Fail",
                message: "Please Provide all fileds"
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "Fail",
            message: "Error! Something went wrong"
        });
    }
};



const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });

        if (user) {
            const matchPassword = await bcrypt.compare(password, user.password);

            if (matchPassword) {
                const jwtToken = jwt.sign({ username }, process.env.JWT_TOKEN_KEY, {
                    expiresIn: 6000,
                });

                res.status(200).send({
                    status: "Pass",
                    message: "User logged in successfully",
                    userid: user._id,
                    username: user.username,
                    token: jwtToken,
                    bookmarks: user.bookmarksStories,
                });
            } else {
                res.status(501).send({
                    status: "Fail",
                    message: "Invalid Credentials",
                });
            }
        } else {
            res.status(502).send({
                status: "Fail",
                message: "User not Found! Please Register",
            });
        }
    } catch (error) {
        res.status(503).send({
            status: "Fail",
            message: "Invalid Credentials",
        });
    }
};

module.exports = { registerUser, loginUser };