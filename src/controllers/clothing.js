const model = require('../models/clothing')

function getAll(req, res, next) {
  const data = model.getAll();

  res.status(200).json({data});
}

function getOne(req, res, next) {
  const data = model.getOne(req.params);

  if (data.errors) {
    return next({
      status: 404,
      message: "Could not locate an article of clothing with that id.",
      errors: data.errors
    })
  }
  res.status(200).json({data});
}

function create(req, res, next) {
  const data = model.create(req.body);

  if (data.errors) {
    return next({
      status: 400,
      message: "Unable to create a new item of clothing.  Please fill in all required fields.",
      errors: data.errors
    })
  }
  res.status(201).json({data});
}

function update(req, res, next) {
  const data = model.update(req.params, req.body);

  if(data.errors) {
    return next({
      status: 400,
      message: "Could not update the info for the item of clothing with that id.",
      errors: data.errors
    })
  }
  res.status(200).json({data});
}

function deleteSingle(req, res, next) {
  const data = model.deleteSingle(req.params);

  if (data.errors) {
    return next({
      status: 404,
      message: "Could not find an item of clothing with that id.",
      errors: data.errors
    })
  }
  res.status(204).json({data});
}

module.exports = {getAll, getOne, create, update, deleteSingle}
