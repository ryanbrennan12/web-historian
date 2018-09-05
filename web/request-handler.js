var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'POST') {
    var buffer = '';
    req.on('data', (chunk) => {
      // var readStream = fs.createReadStream(__dirname + chunk, 'utf-8');
      buffer += chunk;
   
    }).on('end', () => {
      
      
    
      let exampleUrl = buffer.slice(4);

      archive.isUrlArchived(exampleUrl, (isArchived) => {
        console.log('this is the path', archive.paths.siteAssets + '/' + 'loading.html');
        if (isArchived) {
      
          //get html body from archived file via fs.readSomething
          console.log('this is the thing', archive.paths.archivedSites + '/' + exampleUrl);
        } else {
          console.log('hit else statement');
          console.log(archive.paths.siteAssets + '/' + 'loading.html');
          fs.readFile(archive.paths.loadingPage, (err, data) => {
            if (err) {
              throw error;
            } else {
              res.writeHeader(200, {'Content-Type': 'text/html'});
              res.end(body, 'utf-8');
            }
          });
        }
      });
      
  
      fs.appendFileSync(archive.paths.list, exampleUrl + '\n');
      res.writeHeader(302, { 'Content-Type': 'text/html' });
      res.end();
      
    });
    
  }
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(__dirname + '/public/index.html', (err, html) => {
      console.log(html, 'this is the chunk');
      // if (err) {
      //   throw err;
      // }
      
      res.writeHeader(200, { 'Content-Type': 'text/html' });
      // res.write(html);
      res.end(html, 'utf-8');
    });
  } else {
    // console.log('this is the DIRRR', req.url);
    fs.readFile(archive.paths.archivedSites + req.url, (err, html) => {
      console.log('this is the thing', req.url);
      if (err) {
        res.writeHeader(404, { 'Content-Type': 'text/html' });
        res.end();
      }

      res.writeHeader(200, { 'Content-Type': 'text/html' });
      res.end(html, 'utf-8');
    });
    
  }
  // res.end(archive.paths.list);
};

