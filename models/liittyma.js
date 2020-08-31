const mongoose = require('mongoose')

const liittymaSchema = new mongoose.Schema({
    operaattori: {type: String, required: true},
    nimi: {type: String, required: true},
    puhe: {type: String, required: true},
    viestit: {type: String, required: true},
    netti: {type: Number, required: true},
    rajaton: {type: Boolean, required: true},
    eu: {type: Number, required: false},
    hinta: {type: Number, required: true},
})

liittymaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Liittyma', liittymaSchema)