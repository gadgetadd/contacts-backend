const { User } = require('../../models/user');
const { sendMail, generateEmail } = require('../../helpers');

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };
    if (user.verify) {
        res.status(400);
        throw new Error("Verification has already been passed");
    };
    const html = generateEmail(user.verificationToken);
    await sendMail({
        to: email,
        subject: "Phonebook - confirmation code",
        html
    });
    res.json({
        "message": "Verification email sent"
    })
};

module.exports = resendEmail;
