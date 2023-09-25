const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
   nombre: {
    type: String,
    required: true
   },
   descripcion: {
    type: String,
    required: true
   },
   precio: {
    type: Number,
    required: true
   },
   codigo: {
    type: String,
    required: true
   },
   cantidad: {
    type: Number,
    default: 0
   },
   imagen: {
    type: String
    
   }
})

ProductSchema.methods.toJSON = function(){
    /* spread operator */
    const {__v, ...product } = this.toObject()
    return product
}

const ProductModel = model('products', ProductSchema)
module.exports = ProductModel
