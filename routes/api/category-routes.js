const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product
        }
      ]
    });
    return res.json(categories);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product
        }
      ]
    });

    if (!category) throw new Error('Unable to find category');

    return res.json(category);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const category_name = req.body.category_name;

    if (!category_name) throw new Error('Invalid request body.');

    const category = await Category.create({
      category_name
    });

    if (!category) throw new Error('Unable to create category');

    return res.json(category);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category_name = req.body.category_name;

    if (!category_name) throw new Error('Invalid request body.');

    const category = await Category.findOne({
      where: { id: req.params.id },
    });

    if (!category) throw new Error('Unable to create category');

    category.set({
      category_name
    });

    return res.json(category);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: { id: req.params.id },
    });

    if (!category) throw new Error(`Unable to delete category`);

    return res.status(200).send();
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
