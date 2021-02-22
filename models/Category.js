var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  desc: { type: String, required: true, maxlength: 700 }
})

CategorySchema.virtual('url').get(function () {
  return '/inventory/categories/' + this._id
})

module.exports = mongoose.model('Category', CategorySchema)