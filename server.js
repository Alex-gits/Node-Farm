const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replace-template');

// Replacing placeholders in the Card template with data from json array. Giving back edited template with updated info for each object in json string

// Data that we will use constantly. Updated once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObject = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    const cardsHtml = dataObject.map(card => replaceTemplate(tempCard, card)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    const product = dataObject.find(prod => prod.id === +query.id);
    const output = replaceTemplate(tempProduct, product);

    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(data);

    // Error page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello world'
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => console.log('Server has been started on port 8000'));
