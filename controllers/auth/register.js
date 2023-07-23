const gravatar = require('gravatar');
const { customAlphabet } = require('nanoid');

const alphabet = '0123456789';
const idLength = 8;
const generateCustomID = customAlphabet(alphabet, idLength);

const { User } = require('../../models/user');
const { sendMail, generateEmail } = require('../../helpers');

const register = async (req, res) => {
    const { email } = req.body;
    const existentUser = await User.findOne({ email });
    if (existentUser) {
        res.status(409);
        throw new Error("Email in use");
    };
    const avatarURL = gravatar.url(email, { s: '250' });
    const verificationToken = generateCustomID();
    const html = generateEmail(verificationToken);
    const newUser = await User.create({ ...req.body, avatarURL, verificationToken });
    await sendMail({
        to: email,
        subject: "Phonebook - confirmation code",
        html,
    })
    res.status(201).json({
        user: {
            email: newUser.email,
            name: newUser.name,
            avatarURL: newUser.avatarURL
        }
    });
};

module.exports = register;

