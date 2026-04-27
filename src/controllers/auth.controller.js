const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) throw ApiError.badRequest("Email exists");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: normalizedEmail, password: hashed });

    const userData = user.toObject();
    delete userData.password;

    logger.info("User registered", { userId: user._id.toString(), email });
    res.created(userData);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) throw ApiError.badRequest("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw ApiError.badRequest("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    logger.info("User logged in", { userId: user._id.toString(), email });
    res.success({ token });
};
