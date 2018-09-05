var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  if (req.method === 'POST' && req.url === '/') {
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
          
        } else {
          console.log('hit else statement');
          console.log(archive.paths.siteAssets + '/' + 'loading.html');
          
          fs.readFile(archive.paths.siteAssets + '/' + 'loading.html', 'utf-8', (err, html) => {
            // console.log('this is the html', html);
           
            console.log('RESSSS', res);
            res.writeHead(302, {'Content-Type': 'text/html'});
            res.end(html);
      
          });
        }
      });
      
  
      fs.appendFileSync(archive.paths.list, exampleUrl + '\n');
      res.writeHeader(302, { 'Content-Type': 'text/html' });
      res.end();
      
    });
    
  } else if (req.url === '/' && req.method === 'GET') {
    fs.readFile(__dirname + '/public/index.html', (err, html) => {
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html, 'utf-8');
    });
  } else {
    fs.readFile(archive.paths.archivedSites + req.url, (err, html) => {
      
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html, 'utf-8');
    });
    
  }
  // res.end(archive.paths.list);
};

