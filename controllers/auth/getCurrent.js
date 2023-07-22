const getCurrent = async (req, res) => {
    const { email, name, avatarURL } = req.user
    res.json({ email, avatarURL, name })
};

module.exports = getCurrent;
