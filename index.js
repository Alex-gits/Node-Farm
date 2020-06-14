const fs = require('fs');

// Blocking, synchronous way
// const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(inputText);

// const textOutput = `This is what we know about the avocado: ${inputText}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log('File has been written');

// Non-blocking
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) {
    console.log('Error!');
    return;
  }

  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('File has been written');
        fs.readFile('./txt/final.txt', 'utf-8', (err, data4) => {
          console.log(data4);
        });
      });
    });
  });
});

console.log('Will read file');
