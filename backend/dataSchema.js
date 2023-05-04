const mongoose = require('mongoose')
const ReactFormDataSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    image: { type: String },
    location: [String],
    description: { type: String },
    imgSource: { type: String },
},
    { collection: "319_final" }
)
const Product = mongoose.model('Product', ReactFormDataSchema)
module.exports = Product