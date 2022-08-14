const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
      model: Product
      }
    ]
  }).then(categories => res.json(categories)).catch(err => {
    res.status(404).json({message: 'No such category found'})
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  }).then(category => res.json(category)).catch(err => {
    res.status(404).json({message: 'No such category found'})
  })
});

router.post('/', (req, res) => {
  console.log(req.body);
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(createdData => res.json(createdData)).catch(err => {
    res.status(404).json({message: 'Category not created'})
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedData => res.json(updatedData)).catch(err => {
    res.status(404).json({message: 'Category not updated'})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedData => res.json(deletedData)).catch(err => {
    res.status(404).json({message: 'Category not deleted'})
  })
});

module.exports = router;
