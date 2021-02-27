var Category = require('../models/Category')
const Guitar = require('../models/Guitar')

var async = require('async')
const { body, validationResult } = require('express-validator');

//display list of all categories
exports.categories = function (req, res, next) {
  async.parallel({
    categories: function (callback) {
      Category.find({}, callback)
    },
    electric_count: function (callback) {
      Guitar.countDocuments({ category: '603130142c82d7527adbaeb6' }, callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    res.render('categories', { title: 'Categories', data: results })
  })
}

//display detail info for a specific category
exports.category_details = function (req, res, next) {
  Category.findById(req.params.id)
    .exec(function (err, category_details) {
      if (err) { return (next(err)) }
      res.render('categories_detail', { data: category_details })
    })
}

//display form to create new category on GET
exports.category_create_get = function (req, res) {
  res.render('category_add', { title: 'Category Add' })
}
//display form to create new category on POST
exports.category_create_post = [
  // Validate and sanitise fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('desc', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req)

    var category = new Category({
      name: req.body.name,
      desc: req.body.desc,
    })

    if (!errors.isEmpty()) {
      res.render('category_add', { title: 'Category Add', errors: errors.array(), category: category })
    } else {
      Category.findOne({ 'name': req.body.name })
        .exec(function (err, found_category) {
          if (err) { return next(err) }
          if (found_category) {
            res.redirect(found_category.url)
          } else {
            category.save(function (err) {
              if (err) { return next(err) }
              res.redirect(category.url)
            })
          }
        })
    }
  }
]

//handle delete category on GET
exports.category_delete_get = function (req, res, next) {
  async.parallel({
    category: function (callback) {
      Category.findById(req.params.id).exec(callback)
    },
    guitars: function (callback) {
      Guitar.find({ category: req.params.id }).exec(callback)
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.guitars == null) {
      // No results
      res.redirect("/inventory/categories");
    }
    // Successful, so render
    res.render("category_delete", {
      title: "Delete Category",
      category: results.category,
      guitars: results.guitars,
    });
  })
}

//handle delete category on POST
exports.category_delete_post = function (req, res, next) {
  async.parallel({
    category: function (callback) {
      Category.findById(req.params.id).exec(callback)
    },
    guitars: function (callback) {
      Guitar.find({ category: req.params.id }).exec(callback)
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    if (results.guitars.length > 0) {
      res.render("category_delete", {
        title: "Delete Category",
        category: results.category,
        guitars: results.guitars,
      });
      return;
    } else {
      console.log(req.body)
      Category.findByIdAndDelete(req.body.categoryid, function deleteCategory(err) {
        if (err) return next(err);
        res.redirect("/inventory/categories");
      });
    }
  })
}