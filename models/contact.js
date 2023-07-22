const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongoError } = require('../helpers');

const contactJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field'
  }),
  number: Joi.string(),
  favorite: Joi.boolean()
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite'
  })
});

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  number: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, {
  versionKey: false,
  timeStamps: true
});

contactSchema.post("save", handleMongoError);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema
};