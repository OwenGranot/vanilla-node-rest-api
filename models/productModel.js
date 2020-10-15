const { v4: uuidv4 } = require("uuid");

let products = require("../data/products.json");
const { writeDataToFile } = require("../utils.js");

function findAll() {
  // Promise is just for good practice.
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((product) => product.id === id);
    resolve(product);
  });
}
function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((product) => product.id === id);
    products[index] = {id, ...product};

    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((product) => product.id !== id);

        writeDataToFile("./data/products.json", products);
        resolve(true)
    })
}
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
