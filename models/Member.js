const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
  event: String,
  payload: {
    auth: {
      email: {
        type: String,
        required: true,
        trim: true
      }
    },
    customFields: {
      type: Object
    },
    id: String,
    metaData: {
      type: Object
    },
    planConnections: Array,
    verified: Boolean
  },
  reason: Array,
  timestamp: Number
}, {
  timestamps: true
});


const Member = mongoose.model('Member', memberSchema);
module.exports = Member; 