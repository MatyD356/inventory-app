var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  desc: { type: String, required: true, maxlength: 300 }
})

CategorySchema.virtual('url').get(() => '/category/' + this._id)

module.exports = mongoose.model('Category', CategorySchema)