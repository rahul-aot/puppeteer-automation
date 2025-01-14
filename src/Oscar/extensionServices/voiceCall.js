const { waitAndClick } = require("../utils/utils");

async function voiceCallFunction(page, name, number, selector) {
    console.log('Executing voice call action...');
    // await waitAndClick(page, selector);
    // await new Promise(resolve => setTimeout(resolve, 500000));
  }

  module.exports = { voiceCallFunction };