const fs = require('fs');
const path = require('path')
const r = fs.createReadStream(path.resolve(__dirname, './dist/client/index.html'));
r.on('data', chunk => {
    process.stdout.write(chunk.toString())
})
r.on('end', chunk => {
    console.log('end', chunk);
})
r.on('error', err => {
    console.log(err);
})