const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

Product.belongsToMany(Tag, { through: ProductTag })
Tag.belongsToMany(Product, { through: ProductTag})

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll(
    {
      include: [{
        model: Product
      }]
    }
    );
    res
      .status(200)
      .json(allTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const singleTag = await Tag.findByPk(req.params.id,
      {
        include: [{
          model: Product
        }]
      });
    res
      .status(200)
      .json(singleTag)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res
    .status(200)
    .json({ Tag: newTag });
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagToDelete = await Tag.findByPk(req.params.id);
    if (tagToDelete) {
      tagToDelete.destroy();
    }
    res
    .status(200)
    .json({tagToDelete})
  } catch (error) {
    
  }
});

module.exports = router;
