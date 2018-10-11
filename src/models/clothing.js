const uuid = require('uuid/v4');
const clothes = [];

function getAll() {
  return clothes;
}

function getOne(params) {
  const errors = [];
  const id = params.id;
  const findClothing = clothes.find(clothing => clothing.id === id);
  let result;

  if (!findClothing) {
    errors.push('No piece of clothing was found with that id.');
    result = {errors};
  } else {
    result = findClothing;
  }
  return result;
}

function create(body) {
  const errors = [];
  const type = body.type;
  const size = body.size;
  const color = body.color;
  const designer = body.designer;
  const price = body.price;
  let result;

  if (type && size && color && designer && price) {
    const clothing = {id: uuid(), type, size, color, designer, price};
    clothes.push(clothing);
    result = clothing;
  } else {
    errors.push('all fields are required.');
    result = {errors};
  }
  return result;
}

function update(params, body) {
  const errors = [];
  const id = params.id;
  const type = body.type;
  const size = body.size;
  const color = body.color;
  const designer = body.designer;
  const price = body.price;
  let result;

  if (!type || !size || !color || !designer || !price) {
    errors.push('All fields are required in order to update an item of clothing.');
    result = {errors};
  } else {
    let findClothing = clothes.find(clothing => clothing.id === id);

    if (findClothing) {
      findClothing.type = type;
      findClothing.size = size;
      findClothing.color = color;
      findClothing.designer = designer;
      findClothing.price = price;
      result = findClothing;
    }
  }
  return result;
}

function deleteSingle(params) {
  const errors = [];
  const id = params.id;
  const findClothing = clothes.find(clothing => id === clothing.id);
  let result;

  if (findClothing) {
    const index = clothes.indexOf(findClothing);
    clothes.splice(index, 1);
    result = clothes;
  } else {
    errors.push('No piece of clothing was found with that id.');
    result = {errors};
  }
  return result;
}

module.exports = {getAll, getOne, create, update, deleteSingle}
