var mongoose = require('mongoose')

var Schema = mongoose.Schema

var GuitarSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  desc: { type: String, required: true, maxlength: 700 },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  producer: { type: Schema.Types.ObjectId, ref: 'Producer', required: true },
})

//Virtual prop for guitar's URL
GuitarSchema.virtual('url').get(function () {
  return '/inventory/guitars/' + this._id
})

module.exports = mongoose.model('Guitar', GuitarSchema)