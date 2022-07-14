const Blog = require("../models/articleModel");
const Category = require("../models/catogeryModel");

exports.createCategory = async (req, res, next) => {
    // checking is name there or not
  if (!req.body.name) {
    return res.status(400).json({
      message: "Please provide category name",
    });
  }
  //  checking there have jwt on localstorage or not
  if (!req.body.jwt){
    return res.status(400).json({
      message: "Please provide jwt",
    });
  }
  
  try {
    // create category
    const category = await Category.create({
      name: req.body.name
    });
    res.status(201).json({
      category,
      success: true,
    });
  } catch (error) {
    // chexking if category already exists
    if (error.code === 11000) {
      return res.status(400).json({
        message: `Category with name ${req.body.name} already exists`,
      });
    }
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    // find all categories
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      categories,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.getCategoryById = async (req, res) => {
  try {
    // find category by id
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
exports.updateCategoryById = async (req, res) => {
  //  checking is name there or not
  if (!req.body.name) {
    return res.status(400).json({
      message: "Please provide category name",
    });
  }
  //  checking there have jwt on localstorage or not
  if (!req.body.jwt){
    return res.status(400).json({
      message: "Please provide jwt",
    });
  }
  try {
      // update category by id
    const category = await Category.findByIdAndUpdate(req.params.id,{
      name: req.body.name
    }, {
      new: true,
    });
    res.status(200).json({
      category,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.deleteCategoryById = async (req, res) => {
  // checking there have jwt on localstorage or not
  if (!req.body.jwt){
    return res.status(400).json({
      message: "Please provide jwt",
    });
  }
  try {
    // delete category by id
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      category,
      success: true,
    });
  } catch (error) {query
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getAllBlogsByCategoryId = async (req, res) => {
    // find all blogs by category id
  try {
    let query = {};
    query.category = req.params.id;
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      blogs,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};
