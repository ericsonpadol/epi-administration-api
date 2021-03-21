const { customAlphabet } = require('nanoid/async');

const nanoForPin = customAlphabet('0123456789', 6);

const generatePin = async () => {
  const pin = await nanoForPin();
  return pin;
};

module.exports = { generatePin };
