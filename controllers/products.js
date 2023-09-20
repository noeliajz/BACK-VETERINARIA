const cloudinary = require("../helpers/cloudinaryC");
const ProductModel = require("../modals/products");
const { validationResult } = require("express-validator");

const getAllProducts = async (req, res) => {
  try {
    const getAllProd = await ProductModel.find();
    res.status(200).json({ msg: "Se envian productos", getAllProd });
  } catch (error) {
    console.log(error);
    throw new Error(
      "No se encontró el producto"
    ); /* throw personaliza error de node */
  }
};

const getOneProduct = async (req, res) => {
  try {
    const getOneProd = await ProductModel.findOne({ _id: req.params.id });
    res.status(200).json({ msg: "Producto encontrado", getOneProd });
  } catch (error) {
    console.log(error);
  }
};
const createProduct = async (req, res) => {
    
 
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const results = await cloudinary.uploader.upload(req.file.path);
    const urlImage = results.secure_url;
    const newObject = {
      ...req.body,
      imagen: urlImage,
    };
    const newProduct = new ProductModel(newObject);
    await newProduct.save();
    res.status(201).json({ newProduct, status: 201 });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const updateProd = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Producto actualizado correctamente", updateProd });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
