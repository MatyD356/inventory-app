var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ProducerSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  desc: { type: String, required: true, maxlength: 500 }
})

//Virtual prop for producer's URL
ProducerSchema.virtual('url').get(() => '/producer/' + this._id)

module.exports = mongoose.model('Producer', ProducerSchema)