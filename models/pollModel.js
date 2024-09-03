const mongoose = require('mongoose')


const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
      },
      options: {
        type: [String],
        validate: [arrayLimit, 'Options array must contain exactly 3 options.'],
        required: true,
      },
      votes: [{
        option: {
          type: String,
          required: true,
        },
      }],
})

function arrayLimit(val) {
    return val.length === 3;
  }

module.exports = mongoose.model('Poll', pollSchema);