const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Item = require('../models/Item.js');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll();
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        user_id: req.user.id,
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
