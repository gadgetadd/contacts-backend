const { User } = require('../../models/user');

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.body;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };
    const token = user.signToken();
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null, token });
    res.json({
        token,
        user: {
            email: user.email,
            name: user.name,
            avatarURL: user.avatarURL
        }
    })
};

module.exports = verifyEmail;
