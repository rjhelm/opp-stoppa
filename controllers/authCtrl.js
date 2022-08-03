const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender } = req.body;

            let newUserName = username.toLowerCase().replace(/ /g, "");
            const user_name = await Users.findOne({ username: newUserName });
            if(user_name) {
                return res.status(400).json({ msg: "Username is already taken, try again!" });
            }

            const user_email = await Users.findOne({ email });
            if (user_email) {
                return res.status(400).json({ msg: "Email is already registered, try again!" });
            }

            if (password.length < 5) {
                return res.status(400).json({ msg: "Password must exceed 6 characters, try again!" });
            }

            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new Users({
                fullname,
                username: newUserName,
                email,
                password: passwordHash,
                gender,
            });

            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days 
            });
            res.json({
                msg: "Registered Successfully!",
                access_token,
                user: {
                    ...newUser._doc,
                    password: "",
                },
            });

            await newUser.save();

            res.json({ msg: "registered" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await Users.findOne({ _id: req.user._id });
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Your password is wrong." });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({ msg: "Password must exceed 6 characters, try again!" });
            }

            const newPasswordHash = await bcrypt.hash(newPassword, 12);

            await Users.findOneAndUpdate({ _id: req.user._id }, { password: newPasswordHash });

            res.json({ msg: "Password Update Successful!"})
        } catch(err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Register Admin
}