const generateEmail = function (code) {
    return (
        `<h2 style="text-align: center; margin-bottom: 16px;">Confirm your account</h2>
<p style="margin-top: 32px; margin-bottom: 24px; font-size: 14px; font-weight: 400;">
  Here's the confirmation code you requested:<br />
  <span style="font-size: 20px; font-weight: 700; letter-spacing: 3px; display: inline-block; margin-top: 20px; margin-bottom: 20px;">
    ${code}
  </span><br />
  If you didn't request this, you can ignore this email.
</p>`)
};

module.exports = generateEmail;