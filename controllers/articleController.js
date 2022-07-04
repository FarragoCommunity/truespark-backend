const Article = require("../models/articleModel");
const Comment = require("../models/commentModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createBlog= async (req, res) => {
    // create blog
  let message;
  if (!req.body.title) {
    message = "Title is required";
  } else if (!req.body.content) {
    message = "Content is required";
  } else if (!req.body.category) {
    message = "Category is required";
  } else if (!req.body.author) {
    message = "Please provide author";
  } else if (!req.body.image) {
    message = "Please provide image";
  }
  try {
    const blog = await Article.create(req.body);
    res.status(201).json({
      blog,
      success: true,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Articlewith title ${req.body.title} already exists`,
      });
    }
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    // find all blogs
    let query = req.query;
    let limit = req.query.limit;
    const blogs = await Article.find(query)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .limit(limit)
      .skip(query.skip);

    res.status(200).json({
      results: blogs.length,
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

exports.getBlogById = async (req, res) => {
  try {
    // find Articleby id
    const Article= await Blog.findById(req.params.id)
      .populate("author", "name image description")
      .populate("category", "name");
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.updateBlogById = async (req, res) => {
  try {
    // update Article by id
    const blog= await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.deleteBlogById = async (req, res) => {
  try {
    // delete Articleby id
    const Article= await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
};

exports.getBlogsByCategory = async (req, res) => {
  try {
    // find all blogs with category id
    const blogs = await Article.find({
      category: ObjectId(req.params.id),
    }).populate("category", "name");
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

exports.findExeptMe = async (req, res) => {
  try {
    // find all blogs with category id and except me
    const blogs = await Article.find({
      category: ObjectId(req.params.categoryId),
      _id: { $ne: req.params.blogId },
    })
      .populate("category", "name")
      .limit(req.query.limit)
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      blogs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
      success: false,
    });
  }
};


// add like to blog
exports.addLike = async (req, res) => {
  try {
    const blog = await Article.findByIdAndUpdate(req.params.id, {
      $inc: { likes: 1 },
    });
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
}

// add heart to blog
exports.addHeart = async (req, res) => {
  try {
    const blog = await Article.findByIdAndUpdate(req.params.id, {
      $inc: { hearts: 1 },
    });
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
}
// get all comments of blog
exports.getComments = async (req, res) => {
  try {
    const blog = await Comment.find({article: req.params.id})
      .limit(req.query.limit)
      .populate("content","createdBy")
    res.status(200).json({
      blog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
    });
  }
}