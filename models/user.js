const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongoError, signToken, comparePassword, hashPassword } = require("../helpers");

const registerUserJoiSchema = Joi.object({
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
});

const loginUserJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const emailJoiSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'missing required field email'
    })
});

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'User name is required'],
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
    avatarURL: String,
    token: String
}, {
    versionKey: false
});

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.signToken = signToken;

userSchema.pre('save', hashPassword);

userSchema.post("save", handleMongoError);

const User = model('user', userSchema);

module.exports = {
    User,
    registerUserJoiSchema,
    loginUserJoiSchema,
       emailJoiSchema
};