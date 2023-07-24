const express = require('express');
const asyncHandler = require('express-async-handler')
const ctrl = require('../../controllers/auth');

const { validateRequest, authMiddleware, upload } = require('../../middlewares');

const { loginUserJoiSchema, registerUserJoiSchema, emailJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validateRequest(registerUserJoiSchema), asyncHandler(ctrl.register));

router.post('/login', validateRequest(loginUserJoiSchema), asyncHandler(ctrl.login));

router.get("/current", authMiddleware, asyncHandler(ctrl.getCurrent));

router.post("/logout", authMiddleware, asyncHandler(ctrl.logout));

router.patch("/avatars", authMiddleware, upload.single("avatar"), asyncHandler(ctrl.updateAvatar));

router.post("/resend", validateRequest(emailJoiSchema), asyncHandler(ctrl.resendEmail));

router.post("/verify", asyncHandler(ctrl.verifyEmail));

router.get("/check", asyncHandler(ctrl.check));


module.exports = router;
