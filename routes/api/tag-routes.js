const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    });
    return res.json(tags);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product
        }
      ]
    });

    if (!tag) throw new Error('Unable to find tag');

    return res.json(tag);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const tag_name = req.body.tag_name;

    if (!tag_name) throw new Error('Invalid request body.');

    const tag = await Tag.create({
      tag_name
    });

    if (!tag) throw new Error('Unable to create tag');

    return res.json(tag);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag_name = req.body.tag_name;

    if (!tag_name) throw new Error('Invalid request body.');

    const tag = await Tag.findOne({
      where: { id: req.params.id },
    });

    if (!tag) throw new Error('Unable to create tag');

    tag.set({
      tag_name
    });

    return res.json(tag);
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!tag) throw new Error(`Unable to delete tag`);

    return res.status(200).send();
  } catch(err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
