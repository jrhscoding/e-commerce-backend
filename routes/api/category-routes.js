const router = require('express').Router();
const { Category, Product } = require('../../models');

Category.hasMany(Product, {foreignKey: 'category_id'})
Product.belongsTo(Category, {foreignKey: 'category_id'})

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
//include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{
        model: Product
      }]
    });
    res
    .status(200)
    .json(allCategories)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // STILL NEED ****************** to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id);
    res
      .status(200)
      .json(singleCategory)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }

});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
