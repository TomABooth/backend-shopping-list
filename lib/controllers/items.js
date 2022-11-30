const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Item = require('../models/Item.js');
const authorize = require('../middleware/authorize.js');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
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
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
