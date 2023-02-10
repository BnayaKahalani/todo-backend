const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSettingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favoriteTeam: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('UserSetting', userSettingSchema)