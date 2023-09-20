const CartModel = require("../modals/cart")
const ProductModel = require("../modals/products")

/* Trae un carrito con todos los productos: */
const getOneCartAllProduct = async (req, res) => {
    try {
        const getCart = await CartModel.findOne({_id: req.params.id})
        res.status(200).json({msg: 'Carrito encontrado', getCart})
    } catch (error) {
        console.log(error)
    }
}

const addProductCart = async (req, res) => {
    try {
       const getCart = await CartModel.findOne({_id: req.params.idCart}) /* Busco el carrito */
       const getProd = await ProductModel.findOne({_id: req.params.idProd})/* busco el producto */
      
       /* AGREGUE HOY */
      const prodExist = getCart.products.filter((prod) => prod._id == req.params.idProd)
      console.log(prodExist)

      if(prodExist.length > 0){
        return res.status(400).json({msg: 'Producto duplicado en su carrito', status: 400})
      }
 
      
 /* FIN */

       getCart.products.push(getProd) /* agrego el producto al carrito */
       await getCart.save()   /* guarda el carrito */                             
       res.status(200).json({msg: 'El producto se cargo en el carrito correctamente', getCart})
      } catch (error) {
      console.log(error)
    }
  }

  const createCart = async (req, res) => {
    try {
        const newCart = new CartModel(req.body)
        await newCart.save()
        res.status(200).json({msg: 'Carrito creado', newCart})
    } catch (error) {
        console.log(error)
    }
  }




module.exports = {
    getOneCartAllProduct,
    addProductCart,
    createCart
    
}
