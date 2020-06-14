const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%ORIGIN%}/g, product.from);
  output = output.replace(/{%NUTRIENS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};

module.exports = replaceTemplate;
